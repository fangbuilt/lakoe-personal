import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const extensions = [StarterKit];

const Tiptap = (data: any) => {
  const editor = useEditor({
    extensions,
    content: data.content,
    onUpdate: ({ editor }) => {
      data.setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    // <>
    {
      /* <button style={{border: '1px ridge', padding:'3px 12px', marginRight:'5px', borderRadius:'16px'}}
        onClick={() => editor.chain().focus().insertContent('[<strong>Nama Customer</strong>]').run()}
      >
        Nama Pembeli
      </button>
      <button style={{border: '1px ridge', padding:'3px 12px', marginRight:'5px', borderRadius:'16px'}}
        onClick={() => editor.chain().focus().insertContent('[<strong>Nama Produk</strong>]').run()}
      >
        Nama Produk
      </button>
      <button style={{border: '1px ridge', padding:'3px 12px', marginRight:'5px', borderRadius:'16px'}}
        onClick={() => editor.chain().focus().insertContent('[<strong>Nama Toko</strong>]').run()}
      >
        Nama Toko
      </button>

      <EditorContent editor={editor} /> */
    }

    // </>
  );
};

export default Tiptap;
