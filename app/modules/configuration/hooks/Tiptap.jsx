import { useEditor, EditorContent, EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const extensions = [StarterKit]

const content = '<p>Hello World</p>'

// const Tiptap = () => {
//   const editor = useEditor({
//     extensions,
//     content,
//   })

const Tiptap = () => {
  return (
    <EditorProvider extensions={extensions} content={content} >
      <FloatingMenu>Ini floating menu</FloatingMenu>
      <BubbleMenu>Ini bubble menu</BubbleMenu>
    </EditorProvider>
    // <>
    //   <EditorContent editor={editor} />
    //   <FloatingMenu editor={editor} >Ini floating menu</FloatingMenu>
    //   <BubbleMenu editor={editor} >Ini bubble menu</BubbleMenu>
    // </>
  )
}


// export default Tiptap
