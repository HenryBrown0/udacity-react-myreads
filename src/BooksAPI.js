const api = "https://reactnd-books-api.udacity.com";

// Generate a unique token for storing your bookshelf data on the backend server.
let { token } = localStorage;
if (!token) {
	token = Math.random().toString(36).substr(-8);
	localStorage.token = token;
}

const headers = {
	Accept: "application/json",
	Authorization: token
};

export const get = (bookId) => fetch(`${api}/books/${bookId}`, { headers })
	.then((res) => res.json())
	.then((data) => data.book);

export const getAll = () => fetch(`${api}/books`, { headers })
	.then((res) => res.json())
	.then((data) => data.books);

export const update = (bookId, shelf) => fetch(`${api}/books/${bookId}`, {
	method: "PUT",
	headers: {
		...headers,
		"Content-Type": "application/json"
	},
	body: JSON.stringify({ shelf })
}).then((res) => res.json());

export const search = (query, maxResults) => fetch(`${api}/search`, {
	method: "POST",
	headers: {
		...headers,
		"Content-Type": "application/json"
	},
	body: JSON.stringify({ query, maxResults })
})
	.then((res) => res.json())
	.then((data) => {
		if (data.books.error) {
			if (!data.books.error === "empty query") {
				throw new Error(data.book.error);
			}
			return [];
		}
		return data.books;
	});
