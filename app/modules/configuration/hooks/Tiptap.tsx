import { css } from './style';
import { useEditor, EditorContent } from '@tiptap/react';
import { Button, Box } from '@chakra-ui/react';
import StarterKit from '@tiptap/starter-kit';

const extensions = [StarterKit];

export const styles = {
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
      <Box mb={2}>
        <Button
          fontWeight={'normal'}
          fontSize="md"
          size={'sm'}
          variant={'outline'}
          borderRadius={'full'}
          mr={1}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent('[<strong>Nama Pembeli</strong>]')
              .run()
          }
        >
          Nama Pembeli
        </Button>
        <Button
          fontWeight={'normal'}
          fontSize="md"
          size={'sm'}
          variant={'outline'}
          borderRadius={'full'}
          mr={1}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent('[<strong>Nama Produk</strong>]')
              .run()
          }
        >
          Nama Produk
        </Button>
        <Button
          fontWeight={'normal'}
          fontSize="md"
          size={'sm'}
          variant={'outline'}
          borderRadius={'full'}
          mr={1}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent('[<strong>Nama Toko</strong>]')
              .run()
          }
        >
          Nama Toko
        </Button>
      </Box>

      <Box className={styles.container()}>
        <EditorContent editor={editor} />
      </Box>
    </>
  );
};

export default Tiptap;
