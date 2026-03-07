export default function Dashboard(){

return(

<div className="container">

<h1 className="hero-title">
School Dashboard
</h1>

<div style={{display:"flex",gap:"20px",marginTop:"40px"}}>

<div className="card">
<p>Students</p>
<h2>1248</h2>
</div>

<div className="card">
<p>Teachers</p>
<h2>82</h2>
</div>

<div className="card">
<p>Classes</p>
<h2>24</h2>
</div>

</div>

</div>

)

}