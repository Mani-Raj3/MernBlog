// import mongoose from "mongoose";
// import PostModel from "../models/Blog.js"

// const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// const isValidTitle = (title) => /^[A-Za-z\s]+$/.test(title) && title.split(/\s+/).filter(Boolean).length <= 50;
// const isValidSlug = (slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
// const isValidStatus = (status) => ["active", "inactive"].includes(status);

//   //-->> This getAllBlogs is used for 
// const getAllBlogs = async (req, res) => {
//     try {
//         const title = String(req.query.title || "").trim();
//         const description = String(req.query.description || "").trim();
//         const date = String(req.query.date || "").trim();

//         // Pagination
//         const page = Number(req.query.page) || 1;
//         const limit = Number(req.query.limit) || 5;
//         const skip = (page - 1) * limit;

//         // Filter object
//         const filter = {};

//         if (title) {
//             filter.title = { $regex: escapeRegex(title), $options: "i" };
//         }

//         if (description) {
//             filter.desc = { $regex: escapeRegex(description), $options: "i" };
//         }

//         if (date) {
//             const startDate = new Date(`${date}T00:00:00.000Z`);
//             if (Number.isNaN(startDate.getTime())) {
//                 return res.status(400).json({ success: false, message: "Invalid date." });
//             }

//             const endDate = new Date(startDate);
//             endDate.setUTCDate(endDate.getUTCDate() + 1);
//             filter.createdAt = { $gte: startDate, $lt: endDate };
//         }

//         const blogs = await PostModel.find(filter)
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit);

//         const totalBlogs = await PostModel.countDocuments(filter);

//         return res.status(200).json({
//             success: true,
//             totalBlogs,
//             currentPage: page,
//             totalPages: Math.ceil(totalBlogs / limit),
//             blogs
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// }

// const getAllActiveBlogs = async (req, res) => {
//     try {
//         const title = String(req.query.title || "").trim();
//         const description = String(req.query.description || "").trim();
//         const date = String(req.query.date || "").trim();

//         // Pagination
//         const page = Number(req.query.page) || 1;
//         const limit = Number(req.query.limit) || 5;
//         const skip = (page - 1) * limit;

//         // Filter object
//         const filter = {};

//         if (title) {
//             filter.title = { $regex: escapeRegex(title), $options: "i" };
//         }

//         if (description) {
//             filter.desc = { $regex: escapeRegex(description), $options: "i" };
//         }

//         if (date) {
//             const startDate = new Date(`${date}T00:00:00.000Z`);
//             if (Number.isNaN(startDate.getTime())) {
//                 return res.status(400).json({ success: false, message: "Invalid date." });
//             }

//             const endDate = new Date(startDate);
//             endDate.setUTCDate(endDate.getUTCDate() + 1);
//             filter.createdAt = { $gte: startDate, $lt: endDate };
//         }

//         const blogs = await PostModel.find(filter)
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit);

//         const totalBlogs = await PostModel.countDocuments(filter);

//         return res.status(200).json({
//             success: true,
//             totalBlogs,
//             currentPage: page,
//             totalPages: Math.ceil(totalBlogs / limit),
//             blogs
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// }

// const getSingleBlog = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Check if ID is provided
//         if (!id) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Blog ID is required."
//             });
//         }

//         // Check if ID is a valid MongoDB ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Blog ID."
//             });
//         }

//         // Find the blog
//         const blog = await PostModel.findById(id);

//         if (!blog) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Blog not found."
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             blog
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// };

//  // -->> 
// const Create=async(req,res)=>{
//     try {
//         const title = req.body.title?.trim();
//         const desc = req.body.desc?.trim();
//         const slug = req.body.slug?.trim().toLowerCase();
//         const status = req.body.status;

//         if (!title || !slug || !desc || !req.file) {
//             return res.status(400).json({ success: false, message: "Title, slug, description and image are required." });
//         }
//         if (!isValidTitle(title)) {
//             return res.status(400).json({ success: false, message: "Title must contain only letters and spaces, with a maximum of 50 words." });
//         }
//         if (!isValidSlug(slug)) return res.status(400).json({ success: false, message: "Slug can use lowercase letters, numbers and single hyphens only." });
//         if (!isValidStatus(status)) return res.status(400).json({ success: false, message: "Status must be active or inactive." });
//         if (await PostModel.exists({ slug })) return res.status(409).json({ success: false, message: "This slug is already in use." });

//         const imageFile = req.file.filename;

//         /// ye blog ka request shi se chal rha h ki nhi use check krne k liy h 
//        //  res.send('Hello from Blogs')

//        const CreateBlog= new PostModel({
//         title,
//         slug,
//         desc,
//         image:`/images/${imageFile}`,
//         status,
//        })
//        await CreateBlog.save()   //-->> for post creation....
//         return res.status(200).json({success:true,message:"Post Created Successfullyy",post:CreateBlog})

//     } catch (error) {
//         console.log(error)
//      return res.status(500).json({success:false,message:"Internal server error"})
   

//     }
// }

// const Update = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const title = req.body.title?.trim();
//         const desc = req.body.desc?.trim();
//         const slug = req.body.slug?.trim().toLowerCase();
//         const status = req.body.status;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ success: false, message: "Invalid post ID." });
//         }
//         if (!title || !slug || !desc) {
//             return res.status(400).json({ success: false, message: "Title, slug and description are required." });
//         }
//         if (!isValidTitle(title)) {
//             return res.status(400).json({ success: false, message: "Title must contain only letters and spaces, with a maximum of 50 words." });
//         }
//         if (!isValidSlug(slug)) return res.status(400).json({ success: false, message: "Slug can use lowercase letters, numbers and single hyphens only." });
//         if (!isValidStatus(status)) return res.status(400).json({ success: false, message: "Status must be active or inactive." });
//         if (await PostModel.exists({ slug, _id: { $ne: id } })) return res.status(409).json({ success: false, message: "This slug is already in use." });

//         const updates = { title, slug, desc, status };
//         if (req.file) updates.image = `/images/${req.file.filename}`;

//         const post = await PostModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
//         if (!post) return res.status(404).json({ success: false, message: "Post not found." });
//         return res.status(200).json({ success: true, message: "Post updated successfully.", post });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };


// const deletePost = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // 1. Check if ID is provided
//         if (!id) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Post ID is required."
//             });
//         }

//         // 2. Check if ID is a valid MongoDB ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Post ID."
//             });
//         }

//         // 3. Check if post exists
//         const findPost = await PostModel.findById(id);

//         if (!findPost) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Post not found."
//             });
//         }

//         // 4. Delete the post
//         const deletedPost = await PostModel.findByIdAndDelete(id);
//                         // findByIdAndDelete(id); this is used for post deletion 
//         return res.status(200).json({
//             success: true,
//             message: "Post deleted successfully.",
//             post: deletedPost
//         });

//     } catch (error) {
//         console.error(error);

//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error."
//         });
//     }
// };


// // const deletePost=async(req,res)=>{
// //     try {
// //          const postId=req.params.id 

// //          const FindPost= await PostModel.findById(postId)
// //          if(!FindPost){
// //              return res.status(404).json({success:false,message:"Post Not Found"})
// //          }

// //          const deletedPost= await PostModel.deletePost(postId)
// //            return res.status(200).json({success:true,message:"Post Deleted  Successfullyy",post:deletePost})

// //     } catch (error) {
// //         console.log(error)
// //      return res.status(500).json({success:false,message:"Internal server error"})
   
// //     }
// // }




// export { Create, Update, deletePost, getAllBlogs, getSingleBlog };




import mongoose from "mongoose";
import PostModel from "../models/Blog.js";

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isValidTitle = (title) =>
  /^[A-Za-z\s]+$/.test(title) &&
  title.split(/\s+/).filter(Boolean).length <= 50;

const isValidSlug = (slug) =>
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

const isValidStatus = (status) =>
  ["active", "inactive"].includes(status);


// =====================================================
// GET ALL BLOGS
// =====================================================

const getAllBlogs = async (req, res) => {
  try {
    const title = String(req.query.title || "").trim();
    const description = String(req.query.description || "").trim();
    const date = String(req.query.date || "").trim();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const filter = {};

    if (title) {
      filter.title = {
        $regex: escapeRegex(title),
        $options: "i",
      };
    }

    if (description) {
      filter.desc = {
        $regex: escapeRegex(description),
        $options: "i",
      };
    }

    if (date) {
      const startDate = new Date(`${date}T00:00:00.000Z`);

      if (Number.isNaN(startDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date.",
        });
      }

      const endDate = new Date(startDate);
      endDate.setUTCDate(endDate.getUTCDate() + 1);

      filter.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const blogs = await PostModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await PostModel.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      blogs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// =====================================================
// GET ALL ACTIVE BLOGS
// =====================================================

const getAllActiveBlogs = async (req, res) => {
  try {
    const title = String(req.query.title || "").trim();
    const description = String(req.query.description || "").trim();
    const date = String(req.query.date || "").trim();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const filter = {
      status: "active",
    };

    if (title) {
      filter.title = {
        $regex: escapeRegex(title),
        $options: "i",
      };
    }

    if (description) {
      filter.desc = {
        $regex: escapeRegex(description),
        $options: "i",
      };
    }

    if (date) {
      const startDate = new Date(`${date}T00:00:00.000Z`);

      if (Number.isNaN(startDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date.",
        });
      }

      const endDate = new Date(startDate);
      endDate.setUTCDate(endDate.getUTCDate() + 1);

      filter.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const blogs = await PostModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await PostModel.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      blogs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// =====================================================
// GET SINGLE BLOG
// =====================================================

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Blog ID.",
      });
    }

    // Increase view count by 1 whenever the post is opened
    const blog = await PostModel.findByIdAndUpdate(
      id,
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// =====================================================
// CREATE BLOG
// =====================================================

const Create = async (req, res) => {
  try {
    const title = req.body.title?.trim();
    const desc = req.body.desc?.trim();
    const slug = req.body.slug?.trim().toLowerCase();
    const status = req.body.status;

    if (!title || !slug || !desc || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title, slug, description and image are required.",
      });
    }

    if (!isValidTitle(title)) {
      return res.status(400).json({
        success: false,
        message:
          "Title must contain only letters and spaces, with a maximum of 50 words.",
      });
    }

    if (!isValidSlug(slug)) {
      return res.status(400).json({
        success: false,
        message:
          "Slug can use lowercase letters, numbers and single hyphens only.",
      });
    }

    if (!isValidStatus(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be active or inactive.",
      });
    }

    if (await PostModel.exists({ slug })) {
      return res.status(409).json({
        success: false,
        message: "This slug is already in use.",
      });
    }

    const imageFile = req.file.filename;

    const CreateBlog = new PostModel({
      title,
      slug,
      desc,
      image: `/images/${imageFile}`,
      status,

      // New blog starts with zero views
      views: 0,
    });

    await CreateBlog.save();

    return res.status(200).json({
      success: true,
      message: "Post Created Successfullyy",
      post: CreateBlog,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// =====================================================
// UPDATE BLOG
// =====================================================

const Update = async (req, res) => {
  try {
    const { id } = req.params;

    const title = req.body.title?.trim();
    const desc = req.body.desc?.trim();
    const slug = req.body.slug?.trim().toLowerCase();
    const status = req.body.status;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID.",
      });
    }

    if (!title || !slug || !desc) {
      return res.status(400).json({
        success: false,
        message: "Title, slug and desc are required.",
      });
    }

    if (!isValidTitle(title)) {
      return res.status(400).json({
        success: false,
        message:
          "Title must contain only letters and spaces, with a maximum of 50 words.",
      });
    }

    if (!isValidSlug(slug)) {
      return res.status(400).json({
        success: false,
        message:
          "Slug can use lowercase letters, numbers and single hyphens only.",
      });
    }

    if (!isValidStatus(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be active or inactive.",
      });
    }

    if (
      await PostModel.exists({
        slug,
        _id: {
          $ne: id,
        },
      })
    ) {
      return res.status(409).json({
        success: false,
        message: "This slug is already in use.",
      });
    }

    const updates = {
      title,
      slug,
      desc,
      status,
    };

    if (req.file) {
      updates.image = `/images/${req.file.filename}`;
    }

    const post = await PostModel.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      post,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// =====================================================
// DELETE BLOG
// =====================================================

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Post ID.",
      });
    }

    const findPost = await PostModel.findById(id);

    if (!findPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    const deletedPost = await PostModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
      post: deletedPost,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};


export {
  Create,
  Update,
  deletePost,
  getAllBlogs,
  getAllActiveBlogs,
  getSingleBlog,
};