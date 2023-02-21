function kontrol(){
    let yapilacakis = document.getElementById("yapilacakisId").value;
    document.getElementById("yapilacakisId").value="";
    let yapilacakisObject = {
        isinAdi : "",
        aciliyet : false,
        tamamlandi : false,
    }
    if(yapilacakis.length===0 || yapilacakis.trim().length===0){
        alert("Girilen metin boş olamaz");
    }else{
        //local storage e ekleme yapılacak
        yapilacakisObject.isinAdi = yapilacakis.trim();
        ekle(yapilacakisObject);
    }
    
}

function localStorageIdBul(){
    let idler = Object.keys(localStorage);
    let enbuyuk;
    
    if(idler.length===0){
        return 1;
    }else {
        enbuyuk = idler.sort((a,b)=>{
        return b-a;
    })
    console.log(enbuyuk[0]*1+1); 
    return enbuyuk[0]*1+1;
    } 
}

function ekle(gelenObject){
    localStorage.setItem(localStorageIdBul(),JSON.stringify(gelenObject));
    listele();
}

function sil(gelenKeyBilgisi){
    localStorage.removeItem(gelenKeyBilgisi);
    listele();

}

function uzeriCizilimi(gelenKeyBilgisi){
    let mevcutIs = localStorage.getItem(gelenKeyBilgisi);
    mevcutIs = JSON.parse(mevcutIs);
    if(mevcutIs.tamamlandi){
        mevcutIs.tamamlandi = false;
    }else{
        mevcutIs.tamamlandi = true;
    }
    
    mevcutIs = JSON.stringify(mevcutIs);
    localStorage.setItem(gelenKeyBilgisi,mevcutIs);
    listele();
}

function listele(){
    let liste = document.getElementById("liste");
    let isler, tumisler="";
    let key;
    for(let i=0;i<localStorage.length;i++){
        isler = localStorage.getItem(localStorage.key(i));
        key = localStorage.key(i);
        isler = JSON.parse(isler);
        if(isler.tamamlandi){
            tumisler = tumisler + `<div class="bilgi" onclick="uzeriCizilimi('${key}')"><del>${isler.isinAdi}<del></div><div class="Xisareti" onclick="sil('${key}')" title="sil"> X </div>`;
        }else{
            tumisler = tumisler + `<div class="bilgi" onclick="uzeriCizilimi('${key}')">${isler.isinAdi}</div><div class="Xisareti" onclick="sil('${key}')" title="sil"> X </div>`;
        }
        console.log(isler.isinAdi);
    }
    liste.innerHTML = tumisler;
}


document.getElementById("ekleButton").onclick = function(){
    kontrol();
}
listele();

