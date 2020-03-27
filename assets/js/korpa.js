$(document).ready(function () {
	var proizvodi = dohvatiKorpu();
	if (proizvodi.length) {
		prikaziIzLS();
	}
	else {
		praznaKorpa();
	}

});
function prikaziIzLS() {
	var proizvodi = dohvatiKorpu();
	$.ajax({
		url: "assets/data/phones.json",
		success: function (data) {
			data = data.filter(el => {
				for (let p of proizvodi) {
					if (el.id == p.id) {
						el.kolicina = p.kolicina;
						return true;
					}
				}
				return false;
			});
			ispisiTabelu(data)
		}
	});
}

function dohvatiKorpu() {
	return JSON.parse(localStorage.getItem("proizvodi"));
}
function praznaKorpa() {
	$('#sadrzaj').html('<h2>Korpa je prazna</h2>');
}
function ispisiTabelu(proizvodi) {
	var suma = 0;
	var ispis = `
		<table class="table table-dark table-responsive-md" id="korpaTabela">
		<thead>
			<tr>
				<th scope="col">Proizvod</th>
				<th scope="col">Slika</th>
				<th scope="col">Cena po komadu</th>
				<th scope="col">Količina</th>
				<th scope="col">Ukupna cena</th>
				<th scope="col">Briši</th>
			</tr>
		</thead>
		<tbody>
	`;
	for (var pro of proizvodi) {
		suma = suma + ((100 - pro.price.sale) / 100 * pro.price.cost) * pro.kolicina;
		ispis += `
		<tr class="${pro.id}">
				<td>${pro.brend} ${pro.name}</td>
				<td>
						<img width="100px" src="${pro.img.href}" alt="${pro.img.alt}" class="img-fluid"/>
				</td>
				<td>${(100 - pro.price.sale) / 100 * pro.price.cost}&euro;</td>
				<td>${pro.kolicina}</td>
				<td>${((100 - pro.price.sale) / 100 * pro.price.cost) * pro.kolicina}&euro;</td>
				<td><i class="fa fa-trash" onclick="brisi(${pro.id})"></i>
				</td>
		</tr>
	`;
	}
	ispis += `
		<tr>
				<td colspan="6">Ukupna suma: ${suma}&euro;</td>
		</tr>`;
	ispis += `
		</tbody>
		</table>
	`;
	$("#sadrzaj").html(ispis);
}

function brisi(id) {
	var proizvodi = dohvatiKorpu();
	var ostaliProizvodi = proizvodi.filter(p => p.id != id);
	localStorage.setItem("proizvodi", JSON.stringify(ostaliProizvodi));
	prikaziIzLS();
}

