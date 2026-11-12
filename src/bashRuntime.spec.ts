import { validatePath, validatePathResult, _validatePath } from "./bashRuntime";
import { join } from "path";

describe("bashRuntime - validatePath", () => {

    it("returns proper error message when wrong cwd", () => {

        expect(validatePath("non-exist-directory", "bash", "type", "type", "type", "type"))
            .toContain("Error: cwd (non-exist-directory) does not exist.\n");
    });

    it("returns empty message if correct data ", () => {

        expect(validatePath("./", "bash", "type", "type", "type", "type"))
            .toEqual("");
    });
});

describe("bashRuntime - _validatePath", () => {

    it("returns success when all data correct", () => {

        expect(_validatePath("./", "bash", "type", "type", "type", "type"))
            .toEqual([validatePathResult.success, ""]);
    });

    it("returns notExistCwd when cwd incorrect", () => {

        expect(_validatePath("non-exist-directory", "bash", "type", "type", "type", "type"))
            .toEqual([validatePathResult.notExistCwd, ""]);
    });

    it("returns notFoundBash when bash path incorrect", () => {

        expect(_validatePath("./", "invalid-bash-path", "type", "type", "type", "type"))
            .toEqual([validatePathResult.notFoundBash, ""]);
    });

    it("returns notFoundBashdb when bashdb path incorrect", () => {

        const [result, stderr] = _validatePath("./", "bash", "invalid-bashdb-path", "type", "type", "type");
        expect(result).toEqual(validatePathResult.notFoundBashdb);
        expect(stderr).toMatch(/^bash: line \d+: type: invalid-bashdb-path: not found\n$/);
    });

    it("returns notFoundCat when cat path incorrect", () => {

        const [result, stderr] = _validatePath("./", "bash", "type", "invalid-cat-path", "type", "type");
        expect(result).toEqual(validatePathResult.notFoundCat);
        expect(stderr).toMatch(/^bash: line \d+: type: invalid-cat-path: not found\n$/);
    });

    it("returns notFoundMkfifo when mkfifo path incorrect", () => {

        const [result, stderr] = _validatePath("./", "bash", "type", "type", "invalid-mkfifo-path", "type");
        expect(result).toEqual(validatePathResult.notFoundMkfifo);
        expect(stderr).toMatch(/^bash: line \d+: type: invalid-mkfifo-path: not found\n$/);
    });

    it("returns notFoundPkill when pkill path incorrect", () => {

        const [result, stderr] = _validatePath("./", "bash", "type", "type", "type", "invalid-pkill-path");
        expect(result).toEqual(validatePathResult.notFoundPkill);
        expect(stderr).toMatch(/^bash: line \d+: type: invalid-pkill-path: not found\n$/);
    });

    it("returns notFoundBash when all data incorrect", () => {

        expect(_validatePath("invalid-path", "invalid-path", "invalid-path", "invalid-path", "invalid-path", "invalid-path"))
            .toEqual([validatePathResult.notFoundBash, ""]);
    });

    it("returns timeout when timeout", () => {

        expect(_validatePath("./", join(__dirname, "../test-fixtures/slow-bash.sh"), "type", "type", "type", "type", 50))
            .toEqual([validatePathResult.timeout, ""]);
    });
});
