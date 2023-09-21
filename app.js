const appid = document.getElementById("app-id");
const flag = document.getElementById("flag");
const loading = document.getElementById("loading");
window.addEventListener("load", function () {
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://restcountries.com/v3.1/all?fields=name");
	xhttp.send();
	//console.log(xhttp);
	xhttp.onload = function () {
		let data = xhttp.responseText;
		data = JSON.parse(data); // array of objects

		let sel_item = "";
		for (d of data) {
			// console.log(d);
			sel_item = `${sel_item} <option>${d.name.common}</option>`;
		}

		appid.innerHTML = `<select id="selItem">${sel_item}</select>`;

		const selItem = document.querySelector("#selItem");
		selItem.addEventListener("change", function (e) {
			loading.style.display = "block";
			let indexvalue = e.target.selectedIndex;
			let country_name = e.target.options[indexvalue].innerText;

			const reqFlag = new XMLHttpRequest();
			reqFlag.open(
				"GET",
				"https://restcountries.com/v3.1/name/" + country_name
			);
			reqFlag.send();

			reqFlag.onload = function () {
				let data = reqFlag.responseText;
				data = JSON.parse(data);
				flag.src = data[0].flags.svg;
			};
			reqFlag.onreadystatechange = function () {
				console.log(reqFlag.readyState);
				if (reqFlag.readyState == 4) {
					loading.style.display = "none";
				}
			};
		});
	};
});
