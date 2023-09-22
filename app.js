const appid = document.getElementById("app-id");
const flag = document.getElementById("flag");
const loading = document.getElementById("loading");
const others = document.getElementById("others");

window.addEventListener("load", function () {
	const req = new XMLHttpRequest();
	req.open("GET", "https://restcountries.com/v3.1/all?fields=name");
	req.send();

	req.onload = function () {
		// console.log(req);
		let data = req.responseText;
		data = JSON.parse(data);

		// data[index].name.common
		let opt = "";
		for (c of data) {
			opt = `${opt} <option>${c.name.common}</option>`;
		}
		const selectC = document.createElement("select");
		selectC.innerHTML = opt;
		appid.appendChild(selectC);

		selectC.addEventListener("change", function (e) {
			loading.style.display = "inline";

			let i = e.target.selectedIndex;
			let country = e.target.options[i].innerText;

			const cReq = new XMLHttpRequest();
			cReq.open("GET", "https://restcountries.com/v3.1/name/" + country);
			cReq.send();

			cReq.onload = function () {
				let data = JSON.parse(cReq.responseText);
				flag.src = data[0].flags.svg;
				const coa = document.createElement("img");
				const pop = document.createElement("span");
				pop.innerText = data[0].population;
				coa.src = data[0].coatOfArms.svg;
				coa.style.width = "100px";

				others.innerHTML = "";
				others.appendChild(coa);
				others.appendChild(pop);
				console.log(others);
			};

			cReq.onreadystatechange = function () {
				console.log(XMLHttpRequest.DONE);
				if (cReq.readyState == 4) {
					loading.style.display = "none";
				}
			};
		});
	};
});
