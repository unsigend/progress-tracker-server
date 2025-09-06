// import dependencies
import ISBNUtil from "@/util/ISBN";

// import test
import { describe, it, expect } from "@jest/globals";

// test the ISBN utility functions
describe("ISBN Utility Functions", () => {
    const validISBNs = [
        "9356061319",
        "198508659X",
        "1803241055",
        "1449373321",
        "1736049119",
        "978-9356061316",
        "978-1985086593",
        "978-1803241050",
        "978-1449373320",
        "978-1736049112",
        "9332573905",
        "978-9332573901",
    ];
    const invalidISBNs = [
        "9356061318",
        "198508659Y",
        "1803241054",
        "1449373322",
        "1736049118",
        "",
        "  ",
        "john@gmail.com",
    ];
    const normalizedISBNs = {
        "9356061319": "9789356061316",
        "198508659X": "9781985086593",
        "1803241055": "9781803241050",
        "1449373321": "9781449373320",
        "1736049119": "9781736049112",
        "9332573905": "9789332573901",
        "978-9356061316": "9789356061316",
        "978-1985086593": "9781985086593",
        "978-1803241050": "9781803241050",
        "978-1449373320": "9781449373320",
        "978-1736049112": "9781736049112",
        "978-9332573901": "9789332573901",
    };

    it("should check if a string is a valid ISBN", () => {
        validISBNs.forEach((ISBN) => {
            expect(ISBNUtil.isISBN(ISBN)).toBe(true);
        });
        invalidISBNs.forEach((ISBN) => {
            expect(ISBNUtil.isISBN(ISBN)).toBe(false);
        });
    });

    it("should normalize an ISBN", () => {
        Object.entries(normalizedISBNs).forEach(([ISBN, normalizedISBN]) => {
            expect(ISBNUtil.normalizeISBN(ISBN)).toBe(normalizedISBN);
        });
    });
});
