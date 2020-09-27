const shell = require("shelljs");
const fs = require("fs");
const tmp = require("tmp");

const { toMatchPdfSnapshot } = require("jest-pdf-snapshot");
expect.extend({ toMatchPdfSnapshot });

shell.cd("__test__");

function compilerOutput(src) {
    const tmpFile = tmp.fileSync();
    const saty = shell.exec(`satysfi ${src} -o ${tmpFile.name} -b`);
    const code = saty.code;
    const stdout = saty
          .exec("awk '/evaluating texts .../{flag=1;next}/evaluation done/{flag=0}flag'")
          .stdout;
    return {
        code,
        stdout,
    }
}

const baseDir = "base"

afterAll(() => {
    shell.rm(`${baseDir}/*.satysfi-aux`);
});

test("SATySFi is installed", () => {
    expect(shell.exec("satysfi --version").code).toBe(0);
});

describe("Snapshot tests (compiler outputs)", () => {
    const filenames = [
        "type.saty",
    ];
    for (const filename of filenames) {
        test(`compiler output of ${filename}`, () => {
            const res = compilerOutput(`${baseDir}/${filename}`);
            expect(res.code).toBe(0);
            expect(res.stdout).toMatchSnapshot();
        });
    }
});
