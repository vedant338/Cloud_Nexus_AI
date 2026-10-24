from app.services.rag import retrieve


TEST_CASES = [
    {
        "question": "What are the data mining techniques?",
        "expected_terms": [
            "data mining",
            "technique",
        ],
    },
    {
        "question": "What are the objectives?",
        "expected_terms": [
            "objective",
        ],
    },
    {
        "question": "What are the advantages?",
        "expected_terms": [
            "advantage",
        ],
    },
    {
        "question": "What is the capital of France?",
        "expected_terms": [],
    },
]


def evaluate_case(test_case):
    question = test_case["question"]
    expected_terms = test_case["expected_terms"]

    results = retrieve(
        query=question,
        top_k=5,
    )

    retrieved_text = " ".join(
        result.get(
            "text",
            "",
        ).lower()
        for result in results
    )

    if not results:
        passed = len(expected_terms) == 0

    else:
        passed = all(
            term.lower() in retrieved_text
            for term in expected_terms
        )

        if len(expected_terms) == 0:
            passed = False

    return {
        "question": question,
        "retrieved": len(results),
        "passed": passed,
        "sources": [
            result.get(
                "file_name",
                "Unknown",
            )
            for result in results
        ],
    }


def main():

    print(
        "\n===================================="
    )
    print(
        "CLOUDNEXUS RAG EVALUATION"
    )
    print(
        "====================================\n"
    )

    results = []

    for test_case in TEST_CASES:

        result = evaluate_case(
            test_case
        )

        results.append(result)

        status = (
            "PASS"
            if result["passed"]
            else "FAIL"
        )

        print(
            f"[{status}] "
            f"{result['question']}"
        )

        print(
            "Retrieved:",
            result["retrieved"],
        )

        print(
            "Sources:",
            ", ".join(
                result["sources"]
            )
        )

        print()

    passed = sum(
        result["passed"]
        for result in results
    )

    total = len(results)

    accuracy = (
        passed / total * 100
        if total
        else 0
    )

    print(
        "===================================="
    )

    print(
        f"Evaluation: {passed}/{total} "
        f"passed ({accuracy:.1f}%)"
    )

    print(
        "===================================="
    )


if __name__ == "__main__":
    main()