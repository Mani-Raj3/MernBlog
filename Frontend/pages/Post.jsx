import React from 'react'

export const Post = () => {
  return (
    <div className="container text-white mt-5 m">
      <div className="row">
    <div className="col-md-12">
   <h1 className="fw-bold text-white mb-4 display-4">My First Blog</h1>
   <img 
   src="https://images.unsplash.com/photo-1777661097541-e9ebeffe6aa2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Exploring the Art of Writing"
    className="img-fluid mb-4"
    style={{borderRadius: "10px", maxHeight: "500px", objectFit: "cover", width:"100%"}}
    />
    <p className="mb-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit quam voluptatem possimus vero, nisi modi numquam mollitia odio magni vel libero cum rem reprehenderit nam ea inventore iure non neque!</p>
   <hr />

   <h3 className="mt-5 mb-4">Leave a comment</h3>
   {/* <form>
    <div className="mb-3">
   <label htmlFor="comment" className="from-label">Comment</label>
   <textarea className="from-control" id="comment" rows="4" placeholder="Write your comment here" required
   ></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Submit Comment</button>
   </form> */}


<form>
  <div className="mb-3">
    <label htmlFor="comment" className="form-label">
      Comment
    </label>

    <textarea
      className="form-control"
      id="comment"
      rows="4"
      placeholder="Write your comment here"
      required
    ></textarea>
  </div>

  <button type="submit" className="btn btn-primary">
    Submit Comment
  </button>
</form>
<hr />

<h3 className="mt-5 mb-4">Comment</h3>
<div className="bg-secondary p-3 rounded mb-3 d-flex">
  <img src="https://plus.unsplash.com/premium_vector-1728553012443-3cf619e7579d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  alt="kuch bhi"
  className="rounded-circle me-3"
  style={{width:"50px", height:"50px", objectFit:"cover"}}
   />
<div>
<h5 className="mb-1">Mani</h5>
<p className="mb-0">Amazinnnggg</p>
</div>
    </div>
      </div>
       </div> 
    </div>
  )
}
