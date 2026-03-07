export default function PlatformPage(){

return (

<div className="container">

<h1 className="hero-title">
Smart Academic
<br/>
Command Center
</h1>

<p className="subtitle">
A complete school ERP platform for admissions,
attendance, fees, exams and analytics.
</p>

<div style={{marginTop:"30px",display:"flex",gap:"16px"}}>

<a href="/login">
<button className="btn-primary">
Access Dashboard
</button>
</a>

<button className="btn-outline">
Request Demo
</button>

</div>

<div style={{display:"flex",gap:"20px",marginTop:"60px"}}>

<div className="card">
<p>Total Students</p>
<h2>1,248</h2>
</div>

<div className="card">
<p>Attendance Today</p>
<h2>96%</h2>
</div>

<div className="card">
<p>Fees Collected</p>
<h2>₹8.2L</h2>
</div>

</div>

</div>

)

}