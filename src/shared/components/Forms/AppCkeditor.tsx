import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './AppCkeditor.css';

interface Iprops {
  data: string | null;
  onChange: (newData: string) => void;
}

export default function AppCkeditor ({ data, onChange }: Iprops) {
  return (
    <>
      <CKEditor
        editor={ ClassicEditor }
        data={ data }
        config={{
          toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ]
        }}
        onChange={ ( event, editor ) => {
          const newData = editor.getData();
          onChange(newData);
        }}
      />
    </>
  );
}