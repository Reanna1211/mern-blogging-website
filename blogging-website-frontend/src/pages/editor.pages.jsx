import { useContext, useState } from "react"
import { UserContext } from "../App"
import { Navigate } from "react-router-dom"
import PublishForm from "../components/publish-form.component"
import BlogEditor from "../components/blog-editor.component"



const Editor = () => {

    const [ editorState, setEditorState ] = useState('editor') // to be able to keep track/change the state of the component we want ot render out of blog editor and publish form. 'editor is the blog editor other state would be publish

    let { userAuth: { access_token } } = useContext(UserContext) 

    

    return (
        access_token === null ? <Navigate to="/signin"/> 
        : editorState == "editor" ? <BlogEditor /> : <PublishForm />
    )
}

export default Editor