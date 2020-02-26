module.exports = {
	qAll(...args) {
		if (args.length === 2) {
			return Array.from(args[0].querySelectorAll(args[1]));
		} else {
			return Array.from(document.querySelectorAll(args[0]));
		}
	},
	q(...args) {
		if (args.length === 2) {
			return args[0].querySelector(args[1]);
		} else {
			return document.querySelector(args[0]);
		}
	},
	gId(...args) {
		if (args.length === 2) {
			return args[0].getElementById(args[1]);
		} else {
			return document.getElementById(args[0]);
		}
	},

	alias(string) {
		if (typeof(string) == 'string') {
			string = string.toLowerCase();

			// xóa dấu
			string = string
				.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
				.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

			// Thay ký tự đĐ
			string = string.replace(/[đĐ]/g, 'd');

			// Xóa ký tự đặc biệt
			string = string.replace(/([^0-9a-z-\s])/g, '');

			// Xóa khoảng trắng thay bằng ký tự -
			string = string.replace(/(\s+)/g, '-');

			// Xóa ký tự - liên tiếp
			string = string.replace(/-+/g, '-');

			// xóa phần dư - ở đầu & cuối
			string = string.replace(/^-+|-+$/g, '');

			// return
			return string;
		}
	},
}