$(document).ready(function(){
    $(document).on('click', '#dugme', cekiranje);
});


function cekiranje(){
      var ime = $('#ime').val();
      var prezime = $('#prezime').val();
      var telefon = $('#brojTelefona').val();
      var email = $('#email').val();
    
      var regexIme = /^[A-Z][a-z]+$/;
      if(!regexIme.test(ime)){
        $('#ime').removeClass("borderDobar");
        $('#ime').addClass("borderGreska");
      }
      else{
        $('#ime').removeClass("borderGreska");
        $('#ime').addClass("borderDobar");
      }

      var regexPrezime = /^[A-Z][a-z]+$/;
      if(!regexPrezime.test(prezime)){
        $('#prezime').removeClass("borderDobar");
        $('#prezime').addClass("borderGreska");
      }
      else{
        $('#prezime').removeClass("borderGreska");
        $('#prezime').addClass("borderDobar");
      }

      var regexTelefon = /^06[01234569]\/[\d]{6,7}$/;
      if(!regexTelefon.test(telefon)){
        $('#brojTelefona').removeClass("borderDobar");
        $('#brojTelefona').addClass("borderGreska");
      }
      else{
        $('#brojTelefona').removeClass("borderGreska");
        $('#brojTelefona').addClass("borderDobar");
      }

      var regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
      if(!regexEmail.test(email)){
        $('#email').removeClass("borderDobar");
        $('#email').addClass("borderGreska");
      }
      else{
        $('#email').removeClass("borderGreska");
        $('#email').addClass("borderDobar");
      }
    }