import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// layout for this page
import Admin from "layouts/Admin.js";
import { SHOW_SIDEBAR } from "../../../../redux/actions/app";
// core components
import WithAuthentication from "components/WithAuthentication/WithAuthentication";

function WebBuilderPage() {
  const dispatch = useDispatch();
  const [editor, setEditor] = useState(null);
  
  useEffect(() => {
    dispatch({ type: SHOW_SIDEBAR, showSidebar: false });
      const editor = grapesjs.init({
        container: "#editor",
        fromElement: true,
        width: "auto",
        storageManager: {
          id: "gjs-",
          type: "local",
          autosave: true,
          autoload: true,
          stepsBeforeSave: 1,
        },
          plugins: ["gjs-preset-webpage"],
          pluginsOpts: {
            "gjs-preset-webpage": {},
          },
      });
      setEditor(editor);
  }, []);

  return (
    <>
      <div id="editor"></div>
    </>
  );
}

WebBuilderPage.layout = Admin;

export default WithAuthentication(WebBuilderPage);
