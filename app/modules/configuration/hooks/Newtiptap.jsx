// import './styles.scss'

// import { Color } from '@tiptap/extension-color'
// import ListItem from '@tiptap/extension-list-item'
// import TextStyle from '@tiptap/extension-text-style'
// import Text from '@tiptap/extension-text'
// import Document from '@tiptap/extension-document'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// import React from 'react'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <>
    <button style={{border: '1px ridge', padding:'3px 12px', marginRight:'5px', borderRadius:'16px'}}
    // style={{border: '1px solid', color: 'black', borderColor:'gray'}}
      onClick={() => editor.chain().focus().insertContent('[<strong>Nama Customer</strong>]').run()}
      // className={editor.isActive('bold') ? 'is-active' : ''}
    >
      Nama Customer
    </button>
    <button style={{border: '1px ridge', padding:'3px 12px', marginRight:'5px', borderRadius:'16px'}}
      onClick={() => editor.chain().focus().insertContent('[<strong>Nama Produk</strong>]').run()}
      // className={editor.isActive('bold') ? 'is-active' : ''}
    >
      Nama Produk
    </button>
    <button style={{border: '1px ridge', padding:'3px 12px', marginRight:'5px', borderRadius:'16px'}}
      onClick={() => editor.chain().focus().insertContent('[<strong>Nama Toko</strong>]').run()}
      // className={editor.isActive('bold') ? 'is-active' : ''}
    >
      Nama Toko
    </button>
    {/* <button
      style={{border: '1px ridge', padding:'3px 12px', marginRight:'5px', borderRadius:'16px', borderColor:'red'}}
      onClick={() => editor.chain().focus().toggleBold().run()}
      // onClick={() => editor.chain().focus().toggleBold().insertContent('Bold').run()}
      // <strong></strong>
      disabled={
        !editor.can()
          .chain()
          .focus()
          .toggleBold()
          .run()
      }
      className={editor.isActive('bold') ? 'is-active' : ''}
    >
      bold
    </button> */}
    {/* <button
      onClick={() => editor.chain().focus().insertContent('[<strong>Example Text</strong>]').run()}
      className={editor.isActive('bold') ? 'is-active' : ''}
    >
      Example Text
    </button> */}
    </>
  )
}

const extensions = [
  StarterKit
]

const content = `<li>gituu</li>`
// const content = `<textarea style={{border: '1px ridge', borderRadius:'7px', height:'140px', width:'100%', marginTop:'8px', padding:'8px 11px'}}>gituu</textarea>`
// const content = '<h2>Hi there</h2>'

// export default () => {
//   return (
//     <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
//   )
// }

const Newapp = () => {
  return (
    <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
  )
}

export default Newapp
