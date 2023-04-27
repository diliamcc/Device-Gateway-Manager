const { ipv4Validate, passswordValidate } = require("../../common/regex");

describe("testing the regex for IPV4", () => {
	it.each`
		ipv4               | result
		${"192.168.0.1"}   | ${{ isOK: true, message: null }}
		${"0.0.0.0"}       | ${{ isOK: true, message: null }}
		${"a.0.c.d"}       | ${{ isOK: false, message: "Your IPv4 address is not in the correct format" }}
		${"0/0/0-0"}       | ${{ isOK: false, message: "Your IPv4 address is not in the correct format" }}
		${"192.168.0.256"} | ${{ isOK: false, message: "Your IPv4 address is not in the correct format" }}
		${"10.10.10"}      | ${{ isOK: false, message: "Your IPv4 address is not in the correct format" }}
		${"1.1.1.1.1"}     | ${{ isOK: false, message: "Your IPv4 address is not in the correct format" }}
	`("IPV4: $ipv4 is valid? $result", ({ ipv4, result }) => {
		expect(ipv4Validate(ipv4)).toStrictEqual(result);
	});
});
describe("testing the regex for password", () => {
	it.each`
		password      | result
		${"Asd!123*"} | ${{ isOK: true, message: null }}
		${"P4sw0rd*"} | ${{ isOK: true, message: null }}
		${"1n51Gn!4"} | ${{ isOK: true, message: null }}
		${"test"}     | ${{ isOK: false, message: "Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" }}
		${"12345"}    | ${{ isOK: false, message: "Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" }}
		${"6789*"}    | ${{ isOK: false, message: "Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" }}
		${"test123*"} | ${{ isOK: false, message: "Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" }}
		${"yes*12"}   | ${{ isOK: false, message: "Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" }}
		${"Yes*12"}   | ${{ isOK: false, message: "Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" }}
	`("Password: $password is valid? $result", ({ password, result }) => {
		expect(passswordValidate(password)).toStrictEqual(result);
	});
});
