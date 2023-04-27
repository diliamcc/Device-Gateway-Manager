const { saltHashPassword, comparePassword } = require("../../common/hash");

describe("testing hash", () => {
	it.each`
		text
		${"Lorem Ipsum is simply dummy text"}
		${"of the printing and typesetting industry"}
		${"Lorem Ipsum has been the industry's"}
		${"standard dummy text ever since the 1500s, "}
		${"hcagdsyh71y*(^&!@"}
		${"maksodmnja*@!Y*^#%@^&#^6565761231"}
		${"12ut31238IUJSADHH^&S%^&Y@!#"}
	`("Hash $text is valid?", ({ text }) => {
		const hash = saltHashPassword(text);
		expect(hash.passwordHash).not.toEqual(text);
		const compare = comparePassword(text, hash.passwordHash, hash.salt);
		expect(compare).toEqual(true);
	});
});
