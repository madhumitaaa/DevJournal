const token =localStorage.getItem("token");
if(!token)
{
    alert("Unauthorized !! please login");
    window.location.href="login.html";
}
const Params=new URLSearchParams(window.location.search);
const entryid=Params.get("id");
if(!entryid)
{
    alert("no entry specified");
    window.location.href="view.html";
}
document.getElementById("title").value = Params.get("title") || "";
document.getElementById("note").value  = Params.get("note")  || "";
document.getElementById("tag").value   = Params.get("tag")   || "";
document.getElementById("mood").value  = Params.get("mood")  || "";
document.getElementById("energy").value= Params.get("energy")|| "";

document.getElementById("editentryForm").addEventListener("submit",async(e)=>{
  e.preventDefault();

  const title = document.getElementById("title").value;
  const note = document.getElementById("note").value;
  const tag = document.getElementById("tag").value;
  const mood = document.getElementById("mood").value;
  const energy = document.getElementById("energy").value;

try{
const res=await fetch(`http://localhost:5000/api/entries/${entryid}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+token
        },
        body:JSON.stringify({title,note,tag,mood,energy}),
    });

 const data = await res.json();
    if (res.ok) {
      alert("✅ Entry updated successfully!");
      window.location.href = "view.html";
    } else {
      alert(data.message || "❌ Failed to update entry");
    }
}
   catch (err) {
    alert("Error: " + err.message);
  }
});