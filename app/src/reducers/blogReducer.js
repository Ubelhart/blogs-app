import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like: (state, action) => {
      return state.map((blog) => {
        if (blog.id === action.payload) {
          return { ...blog, likes: blog.likes + 1 }
        }
        return blog
      })
    },
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      return [...state, action.payload]
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
    appendComment: (state, action) => {
      return state.map((blog) => {
        if (blog.id === action.payload.blog) {
          return {
            ...blog,
            comments: blog.comments.concat(action.payload.comment),
          }
        }
        return blog
      })
    },
  },
})

export const { like, appendBlog, appendComment, setBlogs, deleteBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = (blogToUpdate) => {
  return async (dispatch) => {
    await blogService.update(blogToUpdate)
    dispatch(like(blogToUpdate.id))
  }
}

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId)
    dispatch(deleteBlog(blogId))
  }
}

export default blogSlice.reducer
