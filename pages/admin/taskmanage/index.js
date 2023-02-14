import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  grayColor
} from "assets/jss/natcash.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Button from "components/CustomButtons/Button.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import Link from "next/link";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import { createTask, getTaskScreen } from "../../../utilities/ApiManage";
import { setShowLoader } from "../../../redux/actions/app";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import bgImage from "assets/img/project.jpg";
import TextField from "@material-ui/core/TextField";
import { ClickAwayListener } from "@material-ui/core";

function TaskManagePage() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();

  const [isCreate, setIsCreate] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      txtAdd: "Add new task...",
      txtAddPlace: "Enter new task name",
      txtDoAdd: "Add new",
      txtCancel: "Cancel"
    },
    {
      id: "vi",
      txtAdd: "Thêm mới công việc...",
      txtAddPlace: "Nhập tên công việc mới",
      txtDoAdd: "Thêm mới",
      txtCancel: "Hủy bỏ"
    },
  ];
  const [text, setText] = useState(listText[0]);
  const [listProject, setListProject] = useState([]);

  useEffect(async () => {
    const res = await getTaskScreen()
    if(res.code == 200){
      setListProject(res.data)
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);

  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);

  const handleCreateTask = async () => {
    const obj = {
      name: newProjectName,
    }
    const res = await createTask(obj)
    if(res.code == 200){
      setNewProjectName("")
      setIsCreate(false)
      setListProject(res.data)
    }
  }

  const renderProject = (pro) => (
    <GridItem xs={12} sm={12} md={3}>
      <Link href={"/admin/taskmanage/" + pro._id}>
        <Button
          color="white"
          style={styles.btnPro}
        >
          <span style= {styles.spanPro}></span>
          <div
            style={styles.btnContainerPro}
          >
            {pro.name}
            {/* <div style={styles.txtProDes}>
              <p style={{padding: "0px 10px", margin: "0px"}}>{pro.description}</p>
            </div> */}
          </div>
        </Button>
      </Link>
    </GridItem>
  )

  return (
    <div>
      <GridContainer>
        {listProject.map((pro) => {
          return renderProject(pro)
        })}
        <GridItem xs={12} sm={12} md={3}>
          {isCreate && (
          <ClickAwayListener onClickAway={() => setIsCreate(false)}>
            <div style={styles.boxNewPro}>
              <div style={styles.txtNewPro}>
                <TextField
                    id="input1"
                    label={text.txtAddPlace}
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputProps={{
                      value: newProjectName,
                      onChange: (e) => setNewProjectName(e.target.value),
                    }}
                    autoComplete="off"
                    multiline={true}
                />
              </div>
              <div style={{display:"flex", justifyContent: "space-between", padding: "0 15px 10px 15px"}}>
                <Button color="primary" size="sm" onClick={() => handleCreateTask()}>{text.txtDoAdd}</Button>
                <Button color="white" size="sm" onClick={() => {setIsCreate(false)}}>{text.txtCancel}</Button>
              </div>
            </div>
            </ClickAwayListener>
          )}
          {!isCreate && (
            <Button color="white" onClick={() => {setIsCreate(true)}}>
              {text.txtAdd}
            </Button>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
}

const styles = {
  txtProDes:{
    textTransform: "none",
    backgroundColor: "white",
    padding: "15px 0",
    borderRadius: "3px",
    width: "100%",
    margin: "5px 0",
    color: grayColor[0],
    textAlign: "start",
    fontWeight: 300,
    whiteSpace: "break-spaces",
  },
  btnPro: {
    width: "100%",
    height: "130px",
    backgroundImage: "url(" + bgImage + ")",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    color: "#fff",
    position: "relative",
    fontWeight: 500,
    fontSize: "18px",
    textTransform: "none"
  },
  btnContainerPro:{
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
    whiteSpace: "break-spaces",
    position: "absolute",
    top: 0,
    margin: "15px",
    left: 0,
  },
  spanPro: {
    backgroundColor: "#0000004d",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: -1,
    // background: "#8c4516",
    // opacity: .5
  },
  boxNewPro:{
    backgroundColor: "white",
    width: "100%",
    height: "auto",
    borderRadius: "3px",
    margin: ".3125rem 1px",
    minHeight: "130px"
  },
  txtNewPro:{
    padding: "15px"
  }
};

TaskManagePage.layout = Admin;

export default WithAuthentication(TaskManagePage);
