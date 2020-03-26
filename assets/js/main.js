$(document).ready(function(){
  $(document).on('click', '.sortDugme', klikSort);

  /* var x = $(".sortDugme");
  x.click(function(){
    console.log("a");
  }); */
  
  $.ajax({
    url: "assets/data/menu.json",
    method: "GET",
    dataType: "json",
    success: function(menu){
      ispisiMenu(menu);
    },
    error: function(xhr, status, err){
      console.log(err);
    }
  });
  /* $.ajax({
    url: "assets/data/phones.json",
    method: "GET",
    dataType: "json",
    success: function(data){
      ispisiTelefon(data);
    },
    error: function(xhr, status, err){
      console.log(err);
    }
  }); */

  prikaziTelefone();

  $.ajax({
    url: "assets/data/filter.json",
    method: "GET",
    dataType: "json",
    success: function(filter){
      ispisiFilter(filter);
    },
    error: function(xhr, status, err){
      console.log(err);
    }
  });
});
function ajaxTelefoni(cbFunc){
  $.ajax({
    url: "assets/data/phones.json",
    method: "GET",
    dataType: "json",
    success: cbFunc
  })
}
function prikaziTelefone(){
  ajaxTelefoni(function(telefons){
    ispisiTelefon(telefons)
  })
}

//ISPISUJE MENI
function ispisiMenu(menu){
  var ispis = '';
  menu.forEach(el => {
    ispis += `<li class="nav-item">
      <a class="bojaNarandz nav-link" href="${el.href}">${el.tekst}
    </a></li>`;
  })
  document.getElementById("navig").innerHTML = ispis;
}

//ISPISUJE FILTER
function ispisiFilter(filter){
  var ispis = "";
  filter.forEach(filter => {
    if(filter.id == 'os1'){
      ispis += `<div><h4 class="marginaGore bojaNarandz brend">Operativni sistem</h4>`;
    }
    else if (filter.id == 'ram3'){
      ispis += `<div><h4 class="marginaGore bojaNarandz brend">RAM</h4>`;
    }
    else if(filter.id == 'rom64'){
      ispis += `<div><h4 class="marginaGore bojaNarandz brend">Interna Memorija</h4>`;
    }
    ispis += `
    <ul class="list-group">
    <li class="list-group-item" valign="center">
      <label class="checkbox-label">
        <input type="checkbox" name="${filter.name}" id="${filter.id} " value="${filter.value}" class="filterDugme"/>
        <label for="${filter.id}" class="tekstic">${filter.tekst}</label>
        <span class="mojCheck"></span>
      </label>
    </li>
    </ul>`;
    if(filter.id == "os2" || filter.id == "ram12"){
      ispis += `</div>`;
    };
  })
  document.getElementById('filter').innerHTML += ispis;

  $('.filterDugme').change(klikFilter);
}
//FILTRIRANJE
function klikFilter(){
  const checkboxOS = $('input[name="os"]:checked');
  const checkboxRam = $('input[name="ram"]:checked');
  const checkboxRom = $('input[name="rom"]:checked');
  //console.log(checkboxRam);
  var boxes = [];
  for(let x of checkboxRam){
    boxes.push({
      ramValue : parseInt(x.value),
      name : x.name
    });
  }
  for(let x of checkboxOS){
    boxes.push({
      osValue : x.value,
      name: x.name
    })
  }
  for(let x of checkboxRom){
    boxes.push({
      romValue : parseInt(x.value),
      name: x.name
    })
  }
  ajaxTelefoni(function(data){
    var print = [];
    var parsedData = [];
      boxes.forEach(box => {
        data.forEach(tel => {
          if(tel.ram == box.ramValue || tel.os == box.osValue || tel.rom == box.romValue){
            print.push(tel);
          }
        })
      })
      

      var ram = [];
      var rom = [];
      var os = [];
      var print2 = [];
      boxes.forEach(box => {
        if(box.name == 'ram'){
          ram.push(box);
        }
        else if(box.name == 'rom'){
          rom.push(box);
        }
      });
      if(ram.length && rom.length && os.length){
        print = [];
        ram.forEach(ram => {
          rom.forEach(rom => {
            data.forEach(telefon =>{
              if(ram.ramValue == telefon.ram && rom.romValue == telefon.rom){
                print2.push(telefon);
              }
            });
          });
        });
      } 

      if(print2.length){
        print = [];
        print2.forEach(p =>{
          print.push(p);
        })
      }
      var br = 0;
      var found = false;
      print.forEach(fon => {
        parsedData.forEach(jedan =>{
          if(fon.id == jedan.id){
            found = true;
          }
        });
        br++;
        if(br == 1 && found == false){
          parsedData.push(fon);
        }
        br = 0;
        found = false;
      })

      if(print.length > 0){
        ispisiTelefon(parsedData);
      }
      else ispisiTelefon(data);
  })


 
}


//ISPISUJE TELEFON
function ispisiTelefon(data){
  var ispis = "";
  data.forEach(el => {
    ispis += `<div class="col-lg-4 col-md-12 overflow-hidden">
    <div class="text-center">
        <h4 class="bojaNarandz brend marginaGore">${el.brend}</h4>
        <p class="bojaNarandz telefonIme">${el.name}</p>
    </div>
    <div class="fon d-flex justify-content-center">
      <img src="${el.img.href}" class="img-fluid" alt="P30"/>
    </div>
    <div class="justify-content-around d-flex marginaGore">`;
    if(el.price.sale != 0){
      ispis+= `<span class="text-danger">${(100 - el.price.sale)/100 * el.price.cost}&euro;</span>
      <span><del>${el.price.cost}&euro;</del></span>`;
    }
    else{
      ispis+=`<span>${el.price.cost}&euro;</span>`;
    }
    ispis+=`
    </div>
    <div class="justify-content-center d-flex marginaGore">
        <button type="button" class="btn btn-dark btn-block" data-toggle="modal" data-target="#telefon${el.id}">
            <span class="bojaNarandz">Pogledajte višе</span>
        </button>

        <div class="modal fade" id="telefon${el.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${el.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <div class="modal-body">
                    <div>
                        <div class="d-flex justify-content-center">
                          <img src="${el.img.href}" class="w-60 img-fluid" alt="P30"/>
                        </div>                      
                        <ul class="list-group list-group-flush marginaGore">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>Display:</span>
                                <span>${el.display}'</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>Resolution:</span>
                                <span>${el.resolution}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>OS:</span>
                                <span>${el.os}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span class="maloDesno">Chipstet:</span>
                                <span>${el.chipset}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>CPU:</span>
                                <span>${el.cpu}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>RAM:</span>
                                <span>${el.ram}GB</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>Storage:</span>
                                <span>${el.rom}GB</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>Rear camera:</span>
                                <span>${el.cameras.rear}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>Front camera:</span>
                                <span>${el.cameras.front}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>Battery:</span>
                                <span>${el.battery} mAh</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-dark" data-dismiss="modal"><span class="bojaNarandz">Zatvori</span></button> 
                    <button type="button" class="btn btn-dark kupi" data-idtelefon= ${el.id} data-dismiss="modal"><span class="bojaNarandz">Kupi</span></button>  
                </div>
              </div>
            </div>
          </div>
    </div>   
</div>`;
    document.getElementById('proizvodi').innerHTML = ispis;
    dodajKlik();
  })
}
// CART

function dodajKlik(){
  $('.kupi').click(dodajuKorpu);
}
function dodajuKorpu(){
  var id = $(this).data('idtelefon');
  var proizvodi = JSON.parse(localStorage.getItem("proizvodi"));
  if(proizvodi){
    if(proizvodPostoji()){
      kolicina();
    }
    else {
      dodajULocalStorage();
    }
  }
  else{
    dodajPrviULocalStorage();
  }
  obavestenje();

  function proizvodPostoji(){
    return proizvodi.filter(p => p.id == id).length;
  }
  function dodajULocalStorage() {
    let proizvodi = JSON.parse(localStorage.getItem("proizvodi"));
    proizvodi.push({
        id : id,
        kolicina : 1
    });
    localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
}
  function kolicina(){
    var proizvodi = JSON.parse(localStorage.getItem("proizvodi"));
    for(let i in proizvodi){
      if(proizvodi[i].id == id){
        proizvodi[i].kolicina++;
        break;
      }
    }
    localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
  }
  function dodajPrviULocalStorage(){
    var proizvodi = [];
    proizvodi[0] = {
      id: id,
      kolicina : 1
    };
    localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
  }
  function obavestenje(){
    $('#obavestenje').css({display: "block"});
    setTimeout(() => $('#obavestenje').fadeOut(), 1200);
  }
}
function ocitstiKorpu(){
  localStorage.removeItem("proizvodi")
}
//SORTIRANJE

function klikSort(){
  var kriterijumSort = $(this).data('sort');
  var redosled = $(this).data('order');
  sortLS(kriterijumSort, redosled);

  ajaxTelefoni(function(telefons){
    sortiraj(telefons, kriterijumSort, redosled);
    ispisiTelefon(telefons);
  })
}
function sortiraj(fon, kriterijumSort, redosled){
  //console.log(fon + "--" + kriterijumSort + redosled);
  fon.sort(function(a, b){
    var va = (kriterijumSort == 'cena') ? a.price.cost : a.name;
    var vb = (kriterijumSort == 'cena') ? b.price.cost : b.name;
    if(va > vb){
      return redosled == "asc" ? 1 : -1;
    }
    else if( va < vb)
      return redosled == "desc" ? 1 : -1;
    else return 0;
  })
}

function sortLS(kriterijumSort, redosled){
  setLocalStorage({ kriterijumSort: kriterijumSort, redosled: redosled});
}

/* GET/SET Funkcije + HELP*/
function setLocalStorage(val){
  return localStorage.setItem('sort', JSON.stringify(val));
}
function getLocalStorage(){
  return JSON.parse(localStorage.getItem('sort'));
}
function inArray(array, element){
  return array.indexOf(element)!==-1;
}

