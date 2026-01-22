const BOT_TOKEN = "8239906332:AAFFVmsSQyE31fs2tvPdtMKW3GmfO7dXnXA"; // ضع توكن البوت هنا
const CHAT_ID   = "6446210491";   // ضع ID الشات هنا

// جلب المنتجات
fetch("products.json")
.then(r=>r.json())
.then(data=>{
  const p=document.getElementById("products");
  data.forEach(item=>{
    const div=document.createElement("div");
    div.className="product";
    div.innerHTML=`
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>${item.price} دج</p>
      <small>Code: ${item.code}</small>
      <button class="fromeach"
        onclick="openBox(
          '${item.image}',
          '${item.name}',
          '${item.price}',
          '${item.code}'
        )">شراء</button>
    `;
    p.appendChild(div);
  });
});

// فتح Box الشراء
function openBox(img,name,price,code){
  document.getElementById("buyImage").src=img;
  document.getElementById("buyTitle").innerText=name;
  document.getElementById("buyPrice").innerText=price+" دج";
  document.getElementById("productCode").value=code;
  document.getElementById("buyBox").style.display="flex";
}

// غلق Box
function closeBox(){
  document.getElementById("buyBox").style.display="none";
}

// إرسال البيانات إلى تيليغرام
function sendToTelegram(){
  const userName = document.getElementById("inputName").value;
  const userLastname = document.getElementById("inputLastname").value;
  const userPhone = document.getElementById("inputPhone").value;
  const code = document.getElementById("productCode").value;

  if(!userName || !userLastname || !userPhone){
    alert("املأ جميع الحقول");
    return;
  }

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      chat_id: CHAT_ID,
      text:
`🛒 طلب شراء
👤 ${userName} ${userLastname}
📞 ${userPhone}
📦 كود المنتج: ${code}`
    })
  }).then(()=>{
    alert("  تم الإرسال  سيتم الرد  قريبا  و شكرا✅");
    closeBox();
  });
}