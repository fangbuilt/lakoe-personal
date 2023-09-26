import { css } from './style';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const extensions = [StarterKit];

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: 'auto',
    border: `1px ridge`,
    borderRadius: 7,
    overflow: 'hidden',
    height: 'auto',
    p: 0,
    '.ProseMirror': {
      p: 16,
      borderRadius: 6,
      height: '190px',
      overflow: 'auto',
    },
  }),
};

const Tiptap = (props: { content: string; setContent: any }) => {
  const editor = useEditor({
    extensions,
    content: props.content,
    onUpdate: ({ editor }) => {
      props.setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div style={{ marginBottom: '5px' }}>
        <button
          style={{
            border: '1px ridge',
            padding: '3px 12px',
            marginRight: '5px',
            borderRadius: '16px',
          }}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent('[<strong>Nama Customer</strong>]')
              .run()
          }
        >
          Nama Customer
        </button>
        <button
          style={{
            border: '1px ridge',
            padding: '3px 12px',
            marginRight: '5px',
            borderRadius: '16px',
          }}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent('[<strong>Nama Produk</strong>]')
              .run()
          }
        >
          Nama Produk
        </button>
        <button
          style={{
            border: '1px ridge',
            padding: '3px 12px',
            marginRight: '5px',
            borderRadius: '16px',
          }}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent('[<strong>Nama Toko</strong>]')
              .run()
          }
        >
          Nama Toko
        </button>
      </div>

      <div className={styles.container()}>
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Tiptap;
