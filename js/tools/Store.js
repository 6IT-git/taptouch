function Store(model) {

	const BOOKMARK = 'ginov_taptouch@ranks';
	const bookmark = JSON.parse(localStorage.getItem(BOOKMARK)) || [];

	const entity = {
		...model,
		load: function () {
			return bookmark.find((item) => item.id == this.id);
		},
		save: function () {
			entity.id = entity.id || Date.now();
			console.log(entity);
			bookmark.push(this);
			console.log(bookmark);
			localStorage.setItem(BOOKMARK, JSON.stringify(bookmark));
			return this
		},
		upd: function () {
			bookmark = bookmark.filter((item) => item.id != this.id);
			bookmark.push(this);
			console.log(bookmark);
			localStorage.setItem(BOOKMARK, JSON.stringify(bookmark));
			return this
		},
		del: function () {
			localStorage.setItem(BOOKMARK, JSON.stringify(
				bookmark = bookmark.filter((item) => item.id != this.id)
			));
			console.log(bookmark);
			localStorage.setItem(BOOKMARK, JSON.stringify(bookmark));
		}

	};

	// console.log(entity);

	return {
		all: bookmark,
		user: entity,
		read: function (key) {
			if (sessionStorage.getItem(key)) {
				const str = sessionStorage.getItem(key);
				tmp = { ...this.user, ...JSON.parse(str), exist: 1 };
				this.book = tmp;
			}
			return this;
		},
		write: function (key, str) {
			tmp = { ...this.user, ...JSON.parse(str), exist: 1 };
			sessionStorage.setItem(key, JSON.stringify(tmp));
			this.user = tmp
			return this;
		}
	}
}