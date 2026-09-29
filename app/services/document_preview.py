import re
import shutil
import subprocess
import tempfile
from pathlib import Path

import markdown
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Preformatted,
)
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics


# =========================================================
# SUPPORTED FILE TYPES
# =========================================================

TEXT_EXTENSIONS = {
    ".txt",
    ".md",
    ".markdown",
}

OFFICE_EXTENSIONS = {
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".odt",
    ".odp",
}


# =========================================================
# HELPERS
# =========================================================

def _clean_markdown(text: str) -> str:
    """
    Convert basic Markdown into readable text suitable
    for PDF preview.
    """

    # Remove fenced code markers but keep code content
    text = re.sub(
        r"```[a-zA-Z0-9_-]*",
        "",
        text,
    )

    text = text.replace(
        "```",
        "",
    )

    return text.strip()


def _markdown_to_pdf(
    source_path: Path,
    output_path: Path,
):
    """
    Convert Markdown/TXT into a simple PDF.
    """

    text = source_path.read_text(
        encoding="utf-8",
        errors="replace",
    )

    suffix = source_path.suffix.lower()

    styles = getSampleStyleSheet()

    normal = ParagraphStyle(
        "CloudNexusNormal",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=15,
        spaceAfter=7,
        alignment=TA_LEFT,
    )

    heading = ParagraphStyle(
        "CloudNexusHeading",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=17,
        leading=21,
        spaceBefore=10,
        spaceAfter=10,
    )

    subheading = ParagraphStyle(
        "CloudNexusSubheading",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        spaceBefore=8,
        spaceAfter=7,
    )

    code_style = ParagraphStyle(
        "CloudNexusCode",
        parent=styles["Code"],
        fontName="Courier",
        fontSize=8.5,
        leading=11,
        spaceAfter=8,
    )

    story = []

    lines = text.splitlines()

    in_code = False
    code_lines = []

    for raw_line in lines:

        line = raw_line.rstrip()

        # -----------------------------------------
        # Code block
        # -----------------------------------------

        if line.strip().startswith("```"):

            if in_code:

                if code_lines:
                    story.append(
                        Preformatted(
                            "\n".join(code_lines),
                            code_style,
                        )
                    )

                code_lines = []
                in_code = False

            else:
                in_code = True

            continue

        if in_code:

            code_lines.append(line)

            continue

        # -----------------------------------------
        # Empty line
        # -----------------------------------------

        if not line.strip():

            story.append(
                Spacer(
                    1,
                    3,
                )
            )

            continue

        # -----------------------------------------
        # Markdown headings
        # -----------------------------------------

        if line.startswith("### "):

            content = line[4:].strip()

            story.append(
                Paragraph(
                    _escape_pdf_text(content),
                    subheading,
                )
            )

            continue

        if line.startswith("## "):

            content = line[3:].strip()

            story.append(
                Paragraph(
                    _escape_pdf_text(content),
                    subheading,
                )
            )

            continue

        if line.startswith("# "):

            content = line[2:].strip()

            story.append(
                Paragraph(
                    _escape_pdf_text(content),
                    heading,
                )
            )

            continue

        # -----------------------------------------
        # Bullet points
        # -----------------------------------------

        if line.startswith("- "):

            content = line[2:].strip()

            story.append(
                Paragraph(
                    "• " +
                    _escape_pdf_text(content),
                    normal,
                )
            )

            continue

        if line.startswith("* "):

            content = line[2:].strip()

            story.append(
                Paragraph(
                    "• " +
                    _escape_pdf_text(content),
                    normal,
                )
            )

            continue

        # -----------------------------------------
        # Numbered list
        # -----------------------------------------

        numbered = re.match(
            r"^(\d+)\.\s+(.*)",
            line,
        )

        if numbered:

            number = numbered.group(1)
            content = numbered.group(2)

            story.append(
                Paragraph(
                    f"{number}. "
                    f"{_escape_pdf_text(content)}",
                    normal,
                )
            )

            continue

        # -----------------------------------------
        # Normal paragraph
        # -----------------------------------------

        story.append(
            Paragraph(
                _escape_pdf_text(line),
                normal,
            )
        )

    if code_lines:

        story.append(
            Preformatted(
                "\n".join(code_lines),
                code_style,
            )
        )

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title=source_path.stem,
        author="CloudNexus AI",
    )

    doc.build(story)


def _escape_pdf_text(text: str) -> str:
    """
    Escape text for ReportLab Paragraph.
    """

    text = str(text)

    text = text.replace(
        "&",
        "&amp;",
    )

    text = text.replace(
        "<",
        "&lt;",
    )

    text = text.replace(
        ">",
        "&gt;",
    )

    # Basic markdown formatting
    text = re.sub(
        r"\*\*(.*?)\*\*",
        r"<b>\1</b>",
        text,
    )

    text = re.sub(
        r"\*(.*?)\*",
        r"<i>\1</i>",
        text,
    )

    return text


# =========================================================
# LIBREOFFICE
# =========================================================

def _office_to_pdf(
    source_path: Path,
    output_path: Path,
):
    """
    Convert DOCX/PPTX/etc. to PDF using LibreOffice.
    """

    if not shutil.which("libreoffice"):
        raise RuntimeError(
            "LibreOffice is not installed. "
            "Install it with: "
            "sudo apt install libreoffice"
        )

    with tempfile.TemporaryDirectory() as output_dir:

        command = [
            "libreoffice",
            "--headless",
            "--convert-to",
            "pdf",
            "--outdir",
            output_dir,
            str(source_path),
        ]

        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=120,
        )

        if result.returncode != 0:

            raise RuntimeError(
                "LibreOffice conversion failed: "
                + (
                    result.stderr.strip()
                    or result.stdout.strip()
                    or "unknown error"
                )
            )

        generated_pdf =   Path(output_dir) / (
                source_path.stem + ".pdf"
            )

        if not generated_pdf.exists():

            raise RuntimeError(
                "LibreOffice did not create a PDF."
            )

        shutil.copyfile(
            generated_pdf,
            output_path,
        )


# =========================================================
# MAIN CONVERSION FUNCTION
# =========================================================

def convert_to_pdf(
    source_path: str | Path,
    output_path: str | Path,
):
    """
    Convert a supported document to PDF.

    PDF files are simply copied.
    Markdown/TXT use ReportLab.
    DOCX/PPTX/etc. use LibreOffice.
    """

    source_path = Path(source_path)
    output_path = Path(output_path)

    suffix = source_path.suffix.lower()

    output_path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    # -----------------------------------------
    # Already PDF
    # -----------------------------------------

    if suffix == ".pdf":

        shutil.copyfile(
            source_path,
            output_path,
        )

        return output_path

    # -----------------------------------------
    # Markdown / text
    # -----------------------------------------

    if suffix in TEXT_EXTENSIONS:

        _markdown_to_pdf(
            source_path,
            output_path,
        )

        return output_path

    # -----------------------------------------
    # Office documents
    # -----------------------------------------

    if suffix in OFFICE_EXTENSIONS:

        _office_to_pdf(
            source_path,
            output_path,
        )

        return output_path

    raise ValueError(
        f"Preview is not supported for "
        f"'{suffix}' files."
    )