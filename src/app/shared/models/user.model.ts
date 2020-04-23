

export class UserModel {
	private name: String;
	private password: String;
	// emailId and contact will be used for authentication.
	private email: String;
	private mobile: String;


	constructor() {
		this.name = '';
		this.password = '';
		this.email = '';
		this.mobile = '';
	}


	public get _name(): String {
		return this.name;
	}

	public get _password(): String {
		return this.password;
	}

	public get _email(): String {
		return this.email;
	}

	public get _mobile(): String {
		return this.mobile;
	}

	public set _name(value: String) {
		this.name = value;
	}

	public set _password(value: String) {
		this.password = value;
	}

	public set _email(value: String) {
		this.email = value;
	}

	public set _mobile(value: String) {
		this.mobile = value;
	}

}
