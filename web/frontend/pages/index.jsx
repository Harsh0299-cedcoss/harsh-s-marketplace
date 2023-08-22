import { Card, Page, Layout } from "@shopify/polaris";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import useContextSaveBar from "../hooks/useContextSaveBar";
import useToast from "../hooks/useToast";

export default function HomePage() {
  // Get Data From Session Storage
  const sessionData = sessionStorage.getItem("Input");

  // State for editor and contextualSaveBar and Toast
  const [input, setInput] = useState(sessionData ?? "");
  const [displayContextBar, subscribeSave, subscribeDiscard] =
    useContextSaveBar();
  const [showToast] = useToast();

  useEffect(() => {
    // Define Contextual Bar on Change of Input
    input && displayContextBar(input !== sessionData);
  }, [input]);

  subscribeSave(() => {
    // on Save, update sessionStorage and show toast
    sessionStorage.setItem("Input", input);
    showToast("Data Saved in Session Storage");
  });

  subscribeDiscard();

  const handleChange = (_, editor) => {
    // Handle Editor Change
    setInput(editor.getData());
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Classic Editor" sectioned>
            <CKEditor
              editor={ClassicEditor}
              data={input}
              onChange={handleChange}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
