import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
  grayColor
} from "assets/jss/natcash.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardContainer from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import { useRouter } from "next/router";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import Link from "next/link";
import moment from "moment";
import Icon from "@material-ui/core/Icon";
import {
  Backdrop,
  Modal,
} from "@material-ui/core";
import { ChatBubbleOutline, ChatBubbleOutlined, CheckBoxOutlined, LocalShippingOutlined, PersonOutlined } from "@material-ui/icons";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import { addMemberSubTask, addMemberTask, createSubTask, createTask, deleteSubTask, deleteTask, getListUser, getTaskDetail, moveGroup, moveTask, removeMemberSubTask, removeMemberTask, updateSubTask, updateTask, uploadImage } from "../../../utilities/ApiManage";
import { setShowLoader } from "../../../redux/actions/app";
import Tooltip from "@material-ui/core/Tooltip";
import bgImage from "assets/img/project-background.jpg";
import TextField from "@material-ui/core/TextField";
import { SHOW_SIDEBAR } from "../../../redux/actions/app";
import Poppers from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import classNames from "classnames";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Fade from "@material-ui/core/Fade";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import vi from "date-fns/locale/vi";
//import { ReactTinyLink } from 'react-tiny-link'
const ReactTinyLink = dynamic(() => import('react-tiny-link').then((mod) => mod.ReactTinyLink))

function TaskDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();

  const [isEditName, setIsEditName] = useState(false);
  const [isAddNewTask, setIsAddNewTask] = useState(null);
  const [isAddNewGroup, setIsAddNewGroup] = useState(false);
  const [isEditGroupName, setIsEditGroupName] = useState(null);
  const [isEditTaskName, setIsEditTaskName] = useState(null);
  const [isEditTaskNameModal, setIsEditTaskNameModal] = useState(false);
  const [isEditTaskDes, setIsEditTaskDes] = useState(false);
  const [displayEditTask, setDisplayEditTask] = useState(null);
  const [showTask, setShowTask] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showType, setShowType] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showInviteTask, setShowInviteTask] = useState(false);
  const [showMember, setShowMember] = useState(null);
  const [showMemberTask, setShowMemberTask] = useState(null);
  const [showDeleteSubTask, setShowDeleteSubTask] = useState(null);
  const [showAddSubTask, setShowAddSubTask] = useState(false);
  const [showTime, setShowTime] = useState(false)
  const [timeFrom, setTimeFrom] = useState(moment().unix())
  const [timeTo, setTimeTo] = useState(moment().unix())
  const [hasTimeFrom, setHasTimeFrom] = useState(false);
  const [hasTimeTo, setHasTimeTo] = useState(false);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isAddComment, setIsAddComment] = useState(false);
  const [showAddAttach, setShowAddAttach] = useState("");
  const [attachUrlLink, setAttachUrlLink] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newAddTaskName, setNewAddTaskName] = useState("");
  const [newAddGroupName, setNewAddGroupName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskNameModal, setNewTaskNameModal] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [widthInput, setWidthInput] = useState(0);
  const [selectedMember, setSelectedMember] = useState([]);
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [showDeleteGroup, setShowDeleteGroup] = useState(null);
  const [showDeleteTask, setShowDeleteTask] = useState(null);
  const spanInput = useRef();
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      txtAdd: "Add new task...",
      txtAddPlace: "Enter new task name",
      txtDoAdd: "Add new",
      txtCancel: "Cancel",
      txtPublic: "Public",
      txtPublicDes: "Anyone can see and edit this board.",
      txtPrivate: "Private",
      txtPrivateDes: "Only board members can see and edit this board.",
      txtChangeType: "Change visibility",
      txtInvite: "Add",
      txtInviteTitle: "Add member",
      txtMember: "User",
      txtAddMember: "User's name",
      txtDelete: "Delete",
      txtMemberInfo: "Member information",
      txtRemoveMember: "Remove member",
      txtAddGroupPlace: "Enter list title",
      txtAddGroup: "Add another list",
      txtSave: "Save",
      txtAddTaskPlace: "Enter card title",
      txtAddTask: "Add another card",
      txtAddTaskBtn: "Add card",
      txtDeleteTask: "Delete card",
      txtDeleteGroup: "Delete list",
      txtDeleteBoard: "Delete board",
      txtDeleteConfirm: "Do you want do delete this object? You can't undo this",
      txtInList: "in list",
      txtMember: "Members",
      txtDate: "Dates",
      txtDescription: "Description",
      txtFile: "Attachments",
      txtComment: "Comments",
      txtSubTask: "Checklist",
      txtAt: "at",
      txtFinish: "finish",
      txtOver: "overdue",
      txtOverSoon: "overdue soon",
      txtInputDes: "Add a more detailed description…",
      txtAddSubTask: "Add an item",
      txtWriteComment: "Write a comment...",
      txtRemove: "Remove",
      txtTimeFrom: "Start date",
      txtTimeTo: "Due date",
      txtAttachFrom: "Attach from...",
      txtAttach: "Attach",
      txtComputer: "Computer",
      txtAttachLink: "Attach a link",
      txtAttachLinkDes: "Paste any link here...",
      txtAdded: "Added "
    },
    {
      id: "vi",
      txtAdd: "Thêm mới công việc...",
      txtAddPlace: "Nhập tên công việc mới",
      txtDoAdd: "Thêm mới",
      txtCancel: "Hủy bỏ",
      txtPublic: "Public",
      txtPublicDes: "Tất cả mọi người có thể xem và chỉnh sửa",
      txtPrivate: "Private",
      txtPrivateDes: "Chỉ những thành viên của tác vụ mới có thể xem và chỉnh sửa.",
      txtChangeType: "Thay đổi hiển thị",
      txtInvite: "Thêm",
      txtInviteTitle: "Thêm thành viên",
      txtMember: "Người dùng",
      txtAddMember: "Tên người dùng",
      txtDelete: "Xóa",
      txtMemberInfo: "Thông tin thành viên",
      txtRemoveMember: "Xóa thành viên",
      txtAddGroupPlace: "Nhập tiêu đề",
      txtAddGroup: "Thêm danh sách mới",
      txtSave: "Lưu",
      txtAddTaskPlace: "Nhập tiêu đề",
      txtAddTask: "Thêm thẻ mới",
      txtAddTaskBtn: "Thêm thẻ",
      txtDeleteTask: "Xóa thẻ",
      txtDeleteGroup: "Xóa nhóm",
      txtDeleteBoard: "Xóa bảng",
      txtDeleteConfirm: "Bạn có muốn xóa đối tượng này? Bạn sẽ không thể hoàn tác.",
      txtInList: "trong danh sách",
      txtMember: "Thành viên",
      txtDate: "Thời hạn",
      txtDescription: "Mô tả",
      txtFile: "Đính kèm",
      txtComment: "Bình luận",
      txtSubTask: "Việc cần làm",
      txtAt: "lúc",
      txtFinish: "hoàn thành",
      txtOver: "quá hạn",
      txtOverSoon: "sắp quá hạn",
      txtInputDes: "Thêm mô tả cho tác vụ…",
      txtAddSubTask: "Thêm tác vụ con",
      txtWriteComment: "Viết bình luận...",
      txtRemove: "Loại bỏ",
      txtTimeFrom: "Ngày bắt đầu",
      txtTimeTo: "Ngày hết hạn",
      txtAttachFrom: "Đính kèm từ...",
      txtAttach: "Đình kèm",
      txtComputer: "Máy tính",
      txtAttachLink: "Đính kèm link",
      txtAttachLinkDes: "Dán một đường link...",
      txtAdded: "Đã thêm "
    },
  ];
  const [text, setText] = useState(listText[0]);
  const [listUser, setListUser] = useState([]);
  const user = useSelector((state) => state.user.userInfo);
  const [projectData, setProjectData] = useState("");

  useEffect(async () => {
    const param = {
      id: id
    }
    const res = await getTaskDetail(param)
    if (res.code == 200) {
      if (Object.keys(res.data).length == 0) {
        dispatch({ type: SHOW_SIDEBAR, showSidebar: true });
        router.push('/admin/taskmanage')
      }
      else {
        setProjectData(res.data)
        setNewProjectName(res?.data?.name)
      }
    }
    const res2 = await getListUser()
    if (res2.code == 200) {
      setListUser(res2.data)
    }
  }, [])

  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
    dispatch({ type: SHOW_SIDEBAR, showSidebar: false });
    document.body.style.background = "url(" + bgImage + ")"
    document.body.style.backgroundSize = "cover"
    document.getElementsByTagName('header')[0].style.color = "white"
    document.getElementsByTagName('header')[0].style.background = "rgb(0,0,0,.15)"
  }, [language]);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      document.body.style.background = ""
      document.getElementsByTagName('header')[0].style.color = "#555555"
      document.getElementsByTagName('header')[0].style.background = "transparent"
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    setWidthInput(spanInput.current.offsetWidth + 40);
  }, [newProjectName]);

  useEffect(async () => {
    if (showTask) {
      setTimeout(() => {
        const cardLink = document.getElementsByClassName('react_tinylink_card')
        const cardFoot = document.getElementsByClassName('react_tinylink_footer')
        const arr = [...cardLink]
        const arrF = [...cardFoot]
        arr.map((item) => {
          item.style.height = "100px"
        })
        arrF.map((item) => {
          item.style.padding = "7px 0"
        })
      }, 1000)
    }
  }, [showTask])

  const handleChangeType = async (type) => {
    let obj = {
      id: id,
      type: type
    }
    const res = await updateTask(obj)
    if (res.code == 200) {
      setProjectData(res.data)
    }
    setShowType(false)
  }

  const handleUpdateProject = async () => {
    let obj = {
      id: id,
      name: newProjectName
    }
    const res = await updateTask(obj)
    if (res.code == 200) {
      setProjectData(res.data)
      setNewProjectName(res?.data?.name)
    }
    setIsEditName(false)
  }

  const handleAddGroup = async () => {
    let obj = {
      parent_id: id,
      name: newAddGroupName
    }
    const res = await createTask(obj)
    if (res.code == 200) {
      setProjectData(res.data)
      setNewAddGroupName("")
      setIsAddNewGroup(false)
    }
  }

  const handleUpdateGroup = async (gId) => {
    let obj = {
      id: gId,
      name: newGroupName
    }
    const res = await updateTask(obj)
    if (res.code == 200) {
      setProjectData(res.data)
    }
    setIsEditGroupName(null)
  }

  const handleDeleteGroup = async (gId) => {
    const res = await deleteTask(gId)
    if (res.code == 200) {
      setProjectData(res.data)
    }
    setShowDeleteGroup(null)
  }

  const handleDeleteProject = async () => {
    const res = await deleteTask(id)
    if (res.code == 200) {
      dispatch({ type: SHOW_SIDEBAR, showSidebar: true });
      router.push('/admin/taskmanage')
    }
  }

  const handleAddMember = async () => {
    if (selectedMember) {
      var listUser = []
      selectedMember.map((item) => {
        listUser.push(item._id)
      })
      const res = await addMemberTask(id, listUser)
      if (res.code == 200) {
        setProjectData(res.data)
      }
    }
    setShowInvite(false)
  }

  const handleCreateSubTask = async (tId) => {
    var obj = {
      task_id: tId,
      name: newAddTaskName
    }
    const res = await createSubTask(obj)
    if (res.code == 200) {
      setProjectData(res.data)
    }
    setIsAddNewTask(null)
    setNewAddTaskName("")
  }

  const handleUpdateTask = async (tId) => {
    var obj = {
      id: tId,
      name: newTaskName
    }
    const res = await updateSubTask(obj)
    if (res.code == 200) {
      setProjectData(res.data.project_data)
    }
    setIsEditTaskName(null)
    setNewTaskName("")
  }

  const handleUpdateTaskModal = async (custom) => {
    var obj = {
      id: showTask._id,
    }
    if (newTaskNameModal) obj.name = newTaskNameModal
    if (newTaskDescription) obj.description = newTaskDescription
    if (timeFrom && hasTimeFrom) obj.time_from = timeFrom
    if (timeTo && hasTimeTo) obj.time_to = timeTo
    if (!hasTimeFrom && showTime) obj.time_from = 0
    if (!hasTimeTo && showTime) obj.time_to = 0
    if (custom) obj = { ...obj, ...custom }
    const res = await updateSubTask(obj)
    if (res.code == 200) {
      setProjectData(res.data.project_data)
      setShowTask(res.data.task_data)
      setNewTaskNameModal(res.data.task_data.name)
      setNewTaskDescription(res.data.task_data.description)
    }
    setIsEditTaskDes(false),
      setIsEditTaskNameModal(false)
    setShowTime(false)
    setShowAddSubTask(false)
    setSubTaskTitle("")
  }

  const handleDeleteTask = async (tId) => {
    const res = await deleteSubTask(tId)
    if (res.code == 200) {
      setProjectData(res.data)
    }
    setShowDeleteTask(null)
  }

  const handleChangeInvite = () => {
    setShowInvite(false)
  }

  const handleChangeInviteTask = () => {
    setShowInviteTask(false)
  }

  const handleRemoveMember = async (memberId) => {
    const res = await removeMemberTask(id, memberId)
    if (res.code == 200) {
      setProjectData(res.data)
    }
    setShowMember(null)
  }

  const handleAddMemberTask = async () => {
    if (selectedMember) {
      var listUser = []
      selectedMember.map((item) => {
        listUser.push(item._id)
      })
      const res = await addMemberSubTask(showTask._id, listUser)
      if (res.code == 200) {
        setProjectData(res.data.project_data)
        setShowTask(res.data.task_data)
      }
    }
    setShowInviteTask(false)
  }

  const handleRemoveMemberTask = async (memberId) => {
    const res = await removeMemberSubTask(showTask._id, memberId)
    if (res.code == 200) {
      setProjectData(res.data.project_data)
      setShowTask(res.data.task_data)
    }
    setShowMemberTask(null)
  }

  const handleAttachLink = async () => {
    handleUpdateTaskModal({ list_attach: [...showTask.list_attach, { url: attachUrlLink, create_time: moment().unix() }] })
    setShowAddAttach(false)
    setAttachUrlLink("")
  }

  const handleAddComment = async () => {
    handleUpdateTaskModal({ list_comment: [...showTask.list_comment, { user: user._id, content: newComment, create_time: moment().unix() }] })
    setIsAddComment(false)
    setNewComment("")
  }

  const handleHideTime = () => {
    setShowTime(false)
    setHasTimeFrom(false)
    setHasTimeTo(false)
  }

  const handleShowTime = () => {
    if (showTask?.time_from) {
      setTimeFrom(showTask.time_from)
      setHasTimeFrom(true)
    }
    if (showTask?.time_to) {
      setTimeTo(showTask.time_to)
      setHasTimeTo(true)
    }
    setShowTime(true)
  }

  const openFileDialog = () => {
    document.getElementById("file-upload").click();
  }

  const handleAddFile = async (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => file);
      const res = await uploadImage(files)
      if (res.code == 200) {
        let listImg = []
        res.data.image_list.map((item, index) => {
          var img = {
            name: files[index].name,
            url: item,
            create_time: moment().unix()
          }
          listImg.push(img)
        })
        handleUpdateTaskModal({ list_attach: [...showTask.list_attach, ...listImg] })
      }
    }
  }

  const handleCheckSubTask = async (item) => {
    let cloneSubTask = JSON.parse(JSON.stringify(showTask.list_sub_task))
    const pos = showTask.list_sub_task.indexOf(item)
    var newSubTask = cloneSubTask[pos]
    newSubTask.is_done = !newSubTask.is_done
    cloneSubTask[pos] = newSubTask
    handleUpdateTaskModal({ list_sub_task: cloneSubTask })
  }

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (type == "list") {
      let cloneProject = JSON.parse(JSON.stringify(projectData))
      let cloneProject2 = JSON.parse(JSON.stringify(projectData))
      const moveG = cloneProject.list_group.filter((w) => w._id == draggableId)[0]
      cloneProject.list_group = cloneProject.list_group.filter((w) => w._id != draggableId)
      cloneProject.list_group.splice(destination?.index, 0, moveG);
      setProjectData(cloneProject)
      const res = await moveGroup(draggableId, destination?.index)
      if (res.code != 200) {
        setProjectData(cloneProject2)
      }
    }
    else if (type == "card") {
      let cloneProject = JSON.parse(JSON.stringify(projectData))
      let cloneProject2 = JSON.parse(JSON.stringify(projectData))
      const posNew = cloneProject.list_group.indexOf(cloneProject.list_group.filter((w) => w._id == destination?.droppableId)[0])
      const posOld = cloneProject.list_group.indexOf(cloneProject.list_group.filter((w) => w._id == source?.droppableId)[0])
      const moveT = (cloneProject.list_group.filter((w) => w._id == source?.droppableId)[0]).list_task.filter((w) => w._id == draggableId)[0]
      cloneProject.list_group[posOld].list_task = cloneProject.list_group[posOld].list_task.filter((w) => w._id != draggableId)
      cloneProject.list_group[posNew].list_task.splice(destination?.index, 0, moveT);
      setProjectData(cloneProject)
      const res = await moveTask(draggableId, destination?.droppableId, destination?.index)
      if (res.code != 200) {
        setProjectData(cloneProject2)
      }
    }
  };

  const formatDateTask = (item) => {
    if (item.time_from && item.time_to) {
      return moment.unix(item.time_from).lang("vi").format("DD MMM") + " - " + moment.unix(item.time_to).lang("vi").format("DD MMM")
    }
    else {
      if (item.time_from) return moment.unix(item.time_from).lang("vi").format("DD MMM")
      else if (item.time_to) return moment.unix(item.time_to).lang("vi").format("DD MMM")
    }
  }

  const formatDateTaskDetail = (item) => {
    if (item.time_from && item.time_to) {
      return moment.unix(item.time_from).lang("vi").format("DD MMM") + " - " + moment.unix(item.time_to).lang("vi").format("DD MMM ") + text.txtAt + moment.unix(item.time_to).format(" HH:mm")
    }
    else {
      if (item.time_from) return moment.unix(item.time_from).lang("vi").format("DD MMM")
      else if (item.time_to) return moment.unix(item.time_to).lang("vi").format("DD MMM ") + text.txtAt + moment.unix(item.time_to).format(" HH:mm")
    }
  }

  const getDateTaskColor = (item) => {
    if (item.is_done) return "#61BD4F"
    else if (item.time_to) {
      if (moment().unix() - item.time_to > 0) return "#EC9488"
      else if (item.time_to - moment().unix() < 259200) return "#f2d600"
      else return "#61BD4F"
    }
  }

  const getDateTaskInColor = (item) => {
    if (item.is_done) return "#61BD4F"
    else if (item.time_to) {
      if (moment().unix() - item.time_to > 0) return "#EC9488"
      else if (item.time_to - moment().unix() < 259200) return "#f2d600"
      else return "transparent"
    }
  }

  const getTaskStatus = (item) => {
    if (item.is_done) return text.txtFinish
    else if (item.time_to) {
      if (moment().unix() - item.time_to > 0) return text.txtOver
      else if (item.time_to - moment().unix() < 259200) return text.txtOverSoon
    }
  }

  const getPercentSubTask = (item) => {
    if (item?.list_sub_task.length > 0) {
      var doneTask = item.list_sub_task.filter((w) => w.is_done).length
      return Math.round((doneTask / item.list_sub_task.length) * 100)
    }
    return 0
  }

  const renderTask = (item, index, parent) => (
    <Draggable key={String(item._id)} draggableId={String(item._id)} index={index}>
      {provided => (
        <div className={classes.cardContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card onMouseEnter={() => setDisplayEditTask(item)} onMouseLeave={() => setDisplayEditTask(null)}>
            {displayEditTask == item && (
              <Button size="sm" justIcon={true} color="transparent" style={styles.btnEditTask} onClick={(e) => { setIsEditTaskName(item), setNewTaskName(item.name) }}>
                <EditOutlinedIcon style={{ color: "#6b778c" }}></EditOutlinedIcon>
              </Button>
            )}
            {isEditTaskName != item && (
              <CardContent style={{ padding: "10px", paddingBotton: "15px" }} onClick={() => { setShowTask(item), setSelectedGroup(parent) }}>
                <p className={classes.txtTaskName}>{item.name}</p>
                <div className={classes.flexWrapCenter}>
                  {(item.time_from > 0 || item.time_to > 0) && (
                    <Button size="sm" style={{ padding: "3px 6px", margin: 0, marginRight: "10px", textTransform: "none", backgroundColor: getDateTaskColor(item) }}>
                      <Icon className={classes.icnClock}>schedule</Icon>
                      <p style={{ fontSize: "12px", margin: 0 }}>{formatDateTask(item)}</p>
                    </Button>
                  )}
                  {item.description && (
                    <Icon className={classes.icnDetail}>subject</Icon>
                  )}
                  {item.list_attach.length > 0 && (
                    <div className={classes.icnDetailContainer}>
                      <Icon className={classes.icnDetail} style={{ marginRight: "2px" }}>attach_file</Icon>
                      <p style={{ fontSize: "12px", margin: 0 }}>{item.list_attach.length}</p>
                    </div>
                  )}
                  {item.list_comment.length > 0 && (
                    <div className={classes.icnDetailContainer}>
                      <ChatBubbleOutline className={classes.icnDetail} style={{ marginRight: "2px" }}></ChatBubbleOutline>
                      <p style={{ fontSize: "12px", margin: 0 }}>{item.list_comment.length}</p>
                    </div>
                  )}
                  {item.list_sub_task.length > 0 && item.list_sub_task.filter((st) => st.is_done == true).length != item.list_sub_task.length && (
                    <div className={classes.icnDetailContainer}>
                      <CheckBoxOutlined className={classes.icnDetail} style={{ marginRight: "2px" }}></CheckBoxOutlined>
                      <p style={{ fontSize: "12px", margin: 0 }}>{item.list_sub_task.filter((st) => st.is_done == true).length + "/" + item.list_sub_task.length}</p>
                    </div>
                  )}
                  {item.list_sub_task.length > 0 && item.list_sub_task.filter((st) => st.is_done == true).length == item.list_sub_task.length && (
                    <div className={classes.icnDetailContainer}>
                      <Button size="sm" style={{ padding: "3px 6px", margin: 0, marginRight: "10px", textTransform: "none", backgroundColor: "#61BD4F" }}>
                        <CheckBoxOutlined className={classes.icnClock}></CheckBoxOutlined>
                        <p style={{ fontSize: "12px", margin: 0 }}>{item.list_sub_task.filter((st) => st.is_done == true).length + "/" + item.list_sub_task.length}</p>
                      </Button>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  {item?.list_member.length > 4 ? (
                    <React.Fragment>
                      {item.list_member.slice(0, 4).map((member) => (
                        <Button size="sm" title={member.name}
                          style={styles.btnMemberTask}>
                          {member.name.split(" ")[0].charAt(0) + member.name.split(" ").at(-1).charAt(0)}
                        </Button>
                      ))}
                      <Button size="sm"
                        style={styles.btnMemberTaskMore}>
                        {"+" + (item.list_member.length - 4).toString()}
                      </Button>
                    </React.Fragment>
                  ) : (
                    item?.list_member.map((member) => (
                      <Button size="sm" title={member.name}
                        style={styles.btnMemberTask}>
                        {member.name.split(" ")[0].charAt(0) + member.name.split(" ").at(-1).charAt(0)}
                      </Button>
                    ))
                  )}
                </div>
              </CardContent>
            )}
          </Card>
          {isEditTaskName == item && (
            <ClickAwayListener onClickAway={() => setIsEditTaskName(null)}>
              <div>
                <TextField
                  id={"inputTask" + item._id}
                  InputLabelProps={{ shrink: false }}
                  variant="outlined"
                  size="small"
                  inputProps={{
                    value: newTaskName,
                    onChange: (e) => setNewTaskName(e.target.value)
                  }}
                  InputProps={{
                    classes: {
                      input: classes.txtInputTaskName,
                    },
                  }}
                  autoComplete="off"
                  autoFocus={true}
                  multiline={true}
                  classes={{
                    root: classes.txtRootGroupName,
                  }}
                  rows={2}
                />
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0" }}>
                  <Button color="primary" size="sm" style={{ margin: 0 }} onClick={() => handleUpdateTask(item._id)}>{text.txtSave}</Button>
                  <div style={{ position: "relative" }}>
                    <Button color="danger" size="sm" style={{ margin: 0 }} onClick={() => setShowDeleteTask(item)}>{text.txtDelete}</Button>
                    <Poppers
                      open={Boolean(showDeleteTask == item)}
                      anchorEl={showDeleteTask == item}
                      transition
                      disablePortal
                      className={
                        classNames({ [classes.popperClose]: showDeleteTask != item }) +
                        " " +
                        classes.popperDeleteTask
                      }
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="show-type"
                          style={{
                            transformOrigin:
                              placement === "bottom" ? "center top" : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={() => setShowDeleteTask(null)}>
                              <div>
                                <p className={classes.txtChangeTitle}>{text.txtDeleteTask}</p>
                                <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                                <p className={classes.txtDeleteDes}>{text.txtDeleteConfirm}</p>
                                <Button size="sm" color="danger" style={{ margin: "10px", width: "280px" }} onClick={() => handleDeleteTask(item._id)}>
                                  {text.txtDelete}
                                </Button>
                              </div>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Poppers>
                  </div>
                </div>
              </div>
            </ClickAwayListener>
          )}

        </div>
      )}
    </Draggable>
  )

  const renderGroup = (item, index) => (
    <Draggable key={String(item._id)} draggableId={String(item._id)} index={index}>
      {provided => (
        <div className={classes.taskContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(item._id)} type="card">
            {provided => (
              <div style={{ paddingBottom: isAddNewTask == item ? "95px" : "30px" }}>
                <div style={{ marginBottom: "5px" }}>
                  <div className={classes.titleTaskContainer}>
                    {isEditGroupName == item ? (
                      <TextField
                        id={"inputTask" + item._id}
                        InputLabelProps={{ shrink: false }}
                        variant="outlined"
                        size="small"
                        inputProps={{
                          value: newGroupName,
                          onChange: (e) => setNewGroupName(e.target.value)
                        }}
                        InputProps={{
                          classes: {
                            input: classes.txtInputGroupName,
                          },
                        }}
                        autoComplete="off"
                        autoFocus={true}
                        multiline={false}
                        classes={{
                          root: classes.txtRootGroupName,
                        }}
                        onBlur={() => handleUpdateGroup(item._id)}
                      />
                    ) : (
                      <p className={classes.txtTaskTitle} onClick={() => { setIsEditGroupName(item), setNewGroupName(item.name) }}>{item.name}</p>
                    )}
                    <div style={{ position: "relative" }}>
                      <Button size="sm" justIcon={true} color="transparent" style={{ margin: 0 }} onClick={() => setShowDeleteGroup(item)}>
                        <Icon>close</Icon>
                      </Button>
                      <Poppers
                        open={Boolean(showDeleteGroup == item)}
                        anchorEl={showDeleteGroup == item}
                        transition
                        disablePortal
                        className={
                          classNames({ [classes.popperClose]: showDeleteGroup != item }) +
                          " " +
                          classes.popperDelete
                        }
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            id="show-type"
                            style={{
                              transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={() => setShowDeleteGroup(null)}>
                                <div>
                                  <p className={classes.txtChangeTitle}>{text.txtDeleteGroup}</p>
                                  <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                                  <p className={classes.txtDeleteDes}>{text.txtDeleteConfirm}</p>
                                  <Button size="sm" color="danger" style={{ margin: "10px", width: "280px" }} onClick={() => handleDeleteGroup(item._id)}>
                                    {text.txtDelete}
                                  </Button>
                                </div>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Poppers>
                    </div>
                  </div>
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {item?.list_task && (
                    item.list_task.map((card, cardIndex) => {
                      return renderTask(card, cardIndex, item)
                    })
                  )}
                  {isAddNewTask == item ? (
                    <ClickAwayListener onClickAway={() => { setIsAddNewTask(null), setNewAddTaskName("") }}>
                      <div className={classes.addnewTaskContainer}>
                        <TextField
                          id={"inputTaskNew" + item._id}
                          InputLabelProps={{ shrink: false }}
                          variant="outlined"
                          size="small"
                          placeholder={text.txtAddTaskPlace}
                          inputProps={{
                            value: newAddTaskName,
                            onChange: (e) => setNewAddTaskName(e.target.value)
                          }}
                          InputProps={{
                            classes: {
                              input: classes.txtInputTaskName,
                            },
                          }}
                          autoComplete="off"
                          autoFocus={true}
                          multiline={true}
                          classes={{
                            root: classes.txtRootGroupName,
                          }}
                          rows={2}
                        //onBlur={() => setIsAddNewTask(null)}
                        />
                        <div style={{ display: "flex", padding: "7px 0" }}>
                          <Button color="primary" size="sm" style={{ margin: 0 }} onClick={() => handleCreateSubTask(item._id)}>{text.txtSave}</Button>
                          <Button size="sm" justIcon={true} color="transparent" style={{ margin: 0 }} onClick={() => { setIsAddNewTask(null), setNewAddTaskName("") }}>
                            <Icon>close</Icon>
                          </Button>
                        </div>
                      </div>
                    </ClickAwayListener>
                  ) : (
                    <Button size="sm" color="transparent" style={styles.btnAddNewTask} onClick={() => setIsAddNewTask(item)}>
                      <Icon className={classes.icnAddNew}>add</Icon>
                      {text.txtAddTask}
                    </Button>
                  )}
                  {provided.placeholder}
                  <div>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.container}>
        <div style={{ display: "flex" }}>
          <span id="hide" style={{ position: "absolute", opacity: 0, fontSize: "17px", fontWeight: 500 }} ref={spanInput}>{newProjectName}</span>
          {!isEditName && (
            <Button size="sm" style={styles.btnPro} onClick={() => setIsEditName(true)}>
              {projectData.name}
            </Button>
          )}
          {isEditName && (
            <TextField
              id="input"
              InputLabelProps={{ shrink: false }}
              variant="outlined"
              size="small"
              inputProps={{
                value: newProjectName,
                onChange: (e) => setNewProjectName(e.target.value)
              }}
              InputProps={{
                classes: {
                  input: classes.txtInput,
                },
                style: { width: widthInput }
              }}
              autoComplete="off"
              autoFocus={true}
              multiline={false}
              classes={{
                root: classes.txtRoot,
              }}
              onBlur={() => handleUpdateProject()}
            />
          )}
          <span style={{ borderLeft: "1px solid rgb(255, 255, 255, 0.5)", margin: "12px 10px" }}></span>
          <div style={{ position: "relative" }}>
            <Button size="sm"
              id="update-label"
              aria-owns={showType ? "show-type" : null}
              aria-haspopup="true"
              style={styles.btnType} onClick={() => setShowType(true)}>
              <Icon className={classes.icnFilter}>{projectData?.type == "PRIVATE" ? "lock_outlined" : "public_outlined"}</Icon>
              {projectData?.type == "PRIVATE" ? text.txtPrivate : text.txtPublic}
            </Button>
            <Poppers
              open={Boolean(showType)}
              anchorEl={showType}
              transition
              disablePortal
              className={
                classNames({ [classes.popperClose]: !showType }) +
                " " +
                classes.popperUpdate
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="show-type"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={() => setShowType(false)}>
                      <div>
                        <p className={classes.txtChangeTitle}>{text.txtChangeType}</p>
                        <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                        <MenuList role="menu">
                          <MenuItem
                            className={classes.dropdownItem}
                            onClick={() => handleChangeType("PRIVATE")}
                          >
                            <div style={{ display: "flex", marginBottom: "5px" }}>
                              <Icon className={classes.icnFilter}>lock_outlined</Icon>
                              <p className={classes.txtTypeDesTitle}>{text.txtPrivate}</p>
                            </div>
                            <p className={classes.txtTypeDes}>{text.txtPrivateDes}</p>
                          </MenuItem>
                          <MenuItem
                            className={classes.dropdownItem}
                            onClick={() => handleChangeType("PUBLIC")}
                          >
                            <div style={{ display: "flex", marginBottom: "5px" }}>
                              <Icon className={classes.icnFilter}>public_outlined</Icon>
                              <p className={classes.txtTypeDesTitle}>{text.txtPublic}</p>
                            </div>
                            <p className={classes.txtTypeDes}>{text.txtPublicDes}</p>
                          </MenuItem>
                        </MenuList>
                      </div>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>
          {projectData.type == "PRIVATE" && (
            <React.Fragment>
              <span style={{ borderLeft: "1px solid rgb(255, 255, 255, 0.5)", margin: "12px 10px" }}></span>
              <div style={{ display: "flex", alignItems: "center" }}>
                {projectData.list_member && (
                  projectData.list_member.map((item) => (
                    <div style={{ position: "relative" }}>
                      <Button size="sm" title={item.name}
                        style={styles.btnMember} onClick={() => setShowMember(item)}>
                        {item.name.split(" ")[0].charAt(0) + item.name.split(" ").at(-1).charAt(0)}
                      </Button>
                      <Poppers
                        open={Boolean(showMember == item)}
                        anchorEl={showMember == item}
                        transition
                        disablePortal
                        className={
                          classNames({ [classes.popperClose]: showMember == null }) +
                          " " +
                          classes.popperUpdate
                        }
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            id="show-type"
                            style={{
                              transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={() => setShowMember(null)}>
                                <div>
                                  <p className={classes.txtChangeTitle}>{text.txtMemberInfo}</p>
                                  <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                                  <div style={{ display: "flex", margin: "5px 10px" }}>
                                    <Button title={item.name}
                                      style={styles.btnMemberLarge}>
                                      {item.name.split(" ")[0].charAt(0) + item.name.split(" ").at(-1).charAt(0)}
                                    </Button>
                                    <div>
                                      <p className={classes.txtMemberName}>{item.name}</p>
                                      <p className={classes.txtMemberDes}>{"@" + item.email.split("@")[0]}</p>
                                    </div>
                                  </div>
                                  <MenuList role="menu">
                                    <MenuItem
                                      className={classes.dropdownItem}
                                      onClick={() => handleRemoveMember(item._id)}
                                    >
                                      <div style={{ display: "flex" }}>
                                        <Icon className={classes.icnFilter}>close</Icon>
                                        <p className={classes.txtTypeDesTitle}>{text.txtRemoveMember}</p>
                                      </div>
                                    </MenuItem>
                                  </MenuList>
                                </div>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Poppers>
                    </div>
                  ))
                )}
              </div>
              <div style={{ position: "relative" }}>
                <Button size="sm"
                  color="success" style={styles.btnInvite} onClick={() => setShowInvite(true)}>
                  <PersonAddOutlinedIcon className={classes.icnFilter} />
                  {text.txtInvite}
                </Button>
                <Poppers
                  open={Boolean(showInvite)}
                  anchorEl={showInvite}
                  transition
                  disablePortal
                  className={
                    classNames({ [classes.popperClose]: !showInvite }) +
                    " " +
                    classes.popperUpdate
                  }
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="show-type"
                      style={{
                        transformOrigin:
                          placement === "bottom" ? "center top" : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={() => handleChangeInvite()}>
                          <div>
                            <p className={classes.txtChangeTitle}>{text.txtInviteTitle}</p>
                            <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                            <Autocomplete
                              multiple
                              limitTags={2}
                              size="small"
                              id="checkboxes-tags-demo"
                              options={listUser}
                              disableCloseOnSelect
                              getOptionLabel={(option) => option.name}
                              onChange={(event, value) => {
                                setSelectedMember(value)
                              }}
                              renderOption={(option, { selected }) => (
                                <React.Fragment>
                                  <Checkbox
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: "rgb(43, 117, 252)" }} />}
                                    style={{ marginRight: 8, }}
                                    checked={selected}
                                  />
                                  <div style={{ alignItems: "center" }}>
                                    <p style={{ fontSize: "15px", margin: 0 }}>{option.name}</p>
                                    <p className={classes.txtMemberSelect}>{"@" + option.email.split("@")[0]}</p>
                                  </div>
                                </React.Fragment>
                              )}
                              style={{ margin: "10px 15px" }}
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" label={text.txtMember} placeholder={text.txtAddMember} />
                              )}
                            />
                            <Button
                              color="success" size="sm" style={{ width: "270px", margin: "10px 15px" }} onClick={() => handleAddMember()}>
                              {text.txtInviteTitle}
                            </Button>
                          </div>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Poppers>
              </div>
            </React.Fragment>
          )}
          <div style={{ position: "absolute", right: 0, marginRight: "10px" }}>
            <Button size="sm" style={styles.btnType} onClick={() => setShowDeleteProject(true)}>
              {text.txtDeleteBoard}
            </Button>
            <Poppers
              open={Boolean(showDeleteProject)}
              anchorEl={showDeleteProject}
              transition
              disablePortal
              className={
                classNames({ [classes.popperClose]: !showDeleteProject }) +
                " " +
                classes.popperDeleteProject
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="show-type"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={() => setShowDeleteProject(false)}>
                      <div>
                        <p className={classes.txtChangeTitle}>{text.txtDeleteBoard}</p>
                        <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                        <p className={classes.txtDeleteDes}>{text.txtDeleteConfirm}</p>
                        <Button size="sm" color="danger" style={{ margin: "10px", width: "280px" }} onClick={() => handleDeleteProject()}>
                          {text.txtDelete}
                        </Button>
                      </div>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <div style={{ display: "flex", flexDirection: "row" }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {projectData.list_group && (
                  projectData.list_group.map((item, index) => {
                    return renderGroup(item, index)
                  })
                )}
                {provided.placeholder}
                {isAddNewGroup ? (
                  <ClickAwayListener onClickAway={() => setIsAddNewGroup(false)}>
                    <div style={styles.boxNewPro}>
                      <div style={styles.txtNewPro}>
                        <TextField
                          id="inputNewGroup"
                          label={text.txtAddGroupPlace}
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{
                            value: newAddGroupName,
                            onChange: (e) => setNewAddGroupName(e.target.value),
                          }}
                          autoFocus={true}
                          autoComplete="off"
                          multiline={false}
                        />
                      </div>
                      <div style={{ display: "flex", padding: "0px 15px" }}>
                        <Button color="primary" size="sm" style={{ margin: 0 }} onClick={() => handleAddGroup()} >{text.txtDoAdd}</Button>
                        <Button size="sm" justIcon={true} color="transparent" style={{ margin: 0 }} onClick={() => setIsAddNewGroup(false)}>
                          <Icon>close</Icon>
                        </Button>
                      </div>
                    </div>
                  </ClickAwayListener>
                ) : (
                  <Button size="sm" style={styles.btnAddNewGroup} onClick={() => setIsAddNewGroup(true)}>
                    <Icon className={classes.icnAddNew}>add</Icon>
                    {text.txtAddGroup}
                  </Button>
                )}
              </div>
            )}
          </Droppable>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showTask != null}
        onClose={() => setShowTask(null)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showTask != null}>
          <CardContainer className={classes.modalContainer}>
            <CardBody>
              <div className={classes.flexContainer}>
                <Icon>credit_card</Icon>
                {isEditTaskNameModal == false ? (
                  <p className={classes.txtTaskModalTitle} onClick={() => { setIsEditTaskNameModal(true), setNewTaskNameModal(showTask.name) }}>{showTask?.name}</p>
                ) : (
                  <TextField
                    id="inputTaskNameModal"
                    InputLabelProps={{ shrink: false }}
                    variant="outlined"
                    size="small"
                    inputProps={{
                      value: newTaskNameModal,
                      onChange: (e) => setNewTaskNameModal(e.target.value)
                    }}
                    InputProps={{
                      classes: {
                        input: classes.txtInputTaskModal,
                      },
                      style: { width: "100%" }
                    }}
                    autoComplete="off"
                    autoFocus={true}
                    multiline={false}
                    classes={{
                      root: classes.txtRootTaskModal,
                    }}
                    onBlur={() => handleUpdateTaskModal()}
                  />
                )}
                <Button size="sm" justIcon={true} color="transparent" style={{ margin: 0 }} onClick={() => { setIsEditTaskNameModal(false), setNewTaskNameModal(showTask.name), setShowTask(null) }}>
                  <Icon>close</Icon>
                </Button>
              </div>
              <div style={{ display: "flex", marginLeft: "38px" }}>
                <p style={{ margin: 0, marginTop: "5px" }}>{text.txtInList}</p>
                <p className={classes.txtInList}>{selectedGroup?.name}</p>
              </div>
              <div style={{ display: "flex", justifyContent: " space-between" }}>
                <div style={{ width: "74%" }}>
                  <div className={classes.flexWrap} style={{ marginLeft: "38px" }}>
                    {showTask?.list_member.length > 0 && (
                      <div style={{ marginRight: "15px" }}>
                        <p style={{ margin: 0, marginTop: "24px", fontWeight: "500" }}>{text.txtMember}</p>
                        <div style={{ display: "flex" }}>
                          {showTask?.list_member.map((member) => (
                            <div style={{ position: "relative" }}>
                              <Button size="sm" title={member.name} onClick={() => setShowMemberTask(member)}
                                style={styles.btnMemberTaskBig}>
                                {member.name.split(" ")[0].charAt(0) + member.name.split(" ").at(-1).charAt(0)}
                              </Button>
                              <Poppers
                                open={Boolean(showMemberTask == member)}
                                anchorEl={showMemberTask == member}
                                transition
                                disablePortal
                                className={
                                  classNames({ [classes.popperClose]: showMemberTask == null }) +
                                  " " +
                                  classes.popperUpdate
                                }
                              >
                                {({ TransitionProps, placement }) => (
                                  <Grow
                                    {...TransitionProps}
                                    id="show-type"
                                    style={{
                                      transformOrigin:
                                        placement === "bottom" ? "center top" : "center bottom",
                                    }}
                                  >
                                    <Paper>
                                      <ClickAwayListener onClickAway={() => setShowMemberTask(null)}>
                                        <div>
                                          <p className={classes.txtChangeTitle}>{text.txtMemberInfo}</p>
                                          <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                                          <div style={{ display: "flex", margin: "5px 10px" }}>
                                            <Button title={member.name}
                                              style={styles.btnMemberLarge}>
                                              {member.name.split(" ")[0].charAt(0) + member.name.split(" ").at(-1).charAt(0)}
                                            </Button>
                                            <div>
                                              <p className={classes.txtMemberName}>{member.name}</p>
                                              <p className={classes.txtMemberDes}>{"@" + member.email.split("@")[0]}</p>
                                            </div>
                                          </div>
                                          <MenuList role="menu">
                                            <MenuItem
                                              className={classes.dropdownItem}
                                              onClick={() => handleRemoveMemberTask(member._id)}
                                            >
                                              <div style={{ display: "flex" }}>
                                                <Icon className={classes.icnFilter}>close</Icon>
                                                <p className={classes.txtTypeDesTitle}>{text.txtRemoveMember}</p>
                                              </div>
                                            </MenuItem>
                                          </MenuList>
                                        </div>
                                      </ClickAwayListener>
                                    </Paper>
                                  </Grow>
                                )}
                              </Poppers>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {(showTask?.time_from > 0 || showTask?.time_to > 0) && (
                      <div>
                        <p style={{ margin: 0, marginTop: "24px", fontWeight: "500" }}>{text.txtDate}</p>
                        <div>
                          <Checkbox
                            color="primary"
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: "rgb(43, 117, 252)" }} />}
                            style={{ marginRight: 8, }}
                            checked={showTask?.is_done}
                            onClick={() => handleUpdateTaskModal({ is_done: !showTask.is_done })}
                          />
                          <Button size="sm"
                            style={styles.btnTaskTime}>
                            {formatDateTaskDetail(showTask)}
                            <p className={classes.lblTimeStatus} style={{ backgroundColor: getDateTaskInColor(showTask) }}>{getTaskStatus(showTask)}</p>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={classes.taskPartContainer}>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <Icon>subject</Icon>
                      <p className={classes.txtDesTitle}>{text.txtDescription}</p>
                    </div>
                    {isEditTaskDes == false ? (
                      <p className={showTask?.description ? classes.txtTaskHaveDes : classes.txtTaskDes} onClick={() => { setIsEditTaskDes(true), setNewTaskDescription(showTask.description) }}>{showTask?.description ? showTask?.description : text.txtInputDes}</p>
                    ) : (
                      <ClickAwayListener onClickAway={() => { setIsEditTaskDes(false), setNewTaskDescription(showTask?.description) }}>
                        <div style={{ marginLeft: "36px" }}>
                          <TextField
                            id="inputTaskDesModal"
                            placeholder={text.txtInputDes}
                            InputLabelProps={{ shrink: false }}
                            variant="outlined"
                            size="small"
                            inputProps={{
                              value: newTaskDescription,
                              onChange: (e) => setNewTaskDescription(e.target.value)
                            }}
                            InputProps={{
                              classes: {
                                input: classes.txtInputTaskDes,
                              },
                              style: { width: "100%" }
                            }}
                            autoComplete="off"
                            autoFocus={true}
                            multiline={true}
                            classes={{
                              root: classes.txtRootTaskDes,
                            }}
                            minRows={4}
                          />
                          <div style={{ display: "flex", padding: "7px 0" }}>
                            <Button color="primary" size="sm" style={{ margin: 0 }} onClick={() => handleUpdateTaskModal()}>{text.txtSave}</Button>
                            <Button size="sm" justIcon={true} color="transparent" style={{ margin: 0 }} onClick={() => { setIsEditTaskDes(false), setNewTaskDescription(showTask?.description) }}>
                              <Icon>close</Icon>
                            </Button>
                          </div>
                        </div>
                      </ClickAwayListener>
                    )}
                  </div>
                  {showTask?.list_attach.length > 0 && (
                    <div className={classes.taskPartContainer}>
                      <div style={{ display: "flex", marginBottom: "10px" }}>
                        <Icon>attach_file</Icon>
                        <p className={classes.txtDesTitle}>{text.txtFile}</p>
                      </div>
                      <div style={{ marginLeft: "36px" }}>
                        {showTask?.list_attach.map((item) => (
                          <div>
                            <div className={classes.fileContainer}>
                              <ReactTinyLink
                                cardSize="small"
                                showGraphic={true}
                                header={item.name ? item.name : ""}
                                proxyUrl={"https://cors.eu.org"}
                                style={{ height: "100px !important" }}
                                height={100}
                                description={text.txtAdded + moment.unix(item.create_time).lang("vi").format("DD MMM ") + text.txtAt + moment.unix(item.create_time).format(" HH:mm")}
                                maxLine={1}
                                minLine={1}
                                url={item.url}
                              />
                            </div>
                            <div style={{ display: "flex", justifyContent: "end" }}>
                              <p className={classes.txtActionComment} onClick={() => handleUpdateTaskModal({ list_attach: showTask.list_attach.filter(sub => sub != item) })}>{text.txtDelete}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className={classes.taskPartContainer}>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <CheckBoxOutlined></CheckBoxOutlined>
                      <p className={classes.txtDesTitle}>{text.txtSubTask}</p>
                    </div>
                    <div style={{ marginLeft: "-7px" }}>
                      <div className={classes.flexContainer}>
                        <p className={classes.txtPercent}>{getPercentSubTask(showTask) + "%"}</p>
                        <CustomLinearProgress
                          style={{ width: "100%", margin: "0", borderRadius: "2px" }}
                          variant="determinate"
                          color={getPercentSubTask(showTask) == 100 ? "success" : "info"}
                          value={getPercentSubTask(showTask)}
                        />
                      </div>
                      {showTask?.list_sub_task && (
                        showTask?.list_sub_task.map((item) => (
                          <div onClick={() => handleCheckSubTask(item)} className={showDeleteSubTask == item ? classes.subTaskContainer : classes.subTaskLeaveContainer} onMouseEnter={() => setShowDeleteSubTask(item)} onMouseLeave={() => setShowDeleteSubTask(null)}>
                            <div className={classes.flexWrapCenter}>
                              <Checkbox
                                color="primary"
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: "rgb(43, 117, 252)" }} />}
                                style={{ marginRight: 8, }}
                                checked={item?.is_done}
                              />
                              <p className={classes.txtSubTaskTitle} style={{ textDecoration: item.is_done ? "line-through" : "none" }}>{item.name}</p>
                            </div>
                            <Button onClick={(e) => { handleUpdateTaskModal({ list_sub_task: showTask.list_sub_task.filter(sub => sub != item) }), e.stopPropagation() }} size="sm" style={{ display: showDeleteSubTask == item ? "block" : "none", backgroundColor: "rgba(9,30,66,.04)", color: "rgba(0, 0, 0, 0.87)", margin: 0, marginRight: "5px" }} justIcon={true}>
                              <Icon>close</Icon>
                            </Button>
                          </div>
                        ))
                      )}
                      <div style={{ marginLeft: "45px" }}>
                        {showAddSubTask ? (
                          <ClickAwayListener onClickAway={() => { setShowAddSubTask(false), setSubTaskTitle("") }}>
                            <div>
                              <TextField
                                id="inputTaskSubTask"
                                placeholder={text.txtAddSubTask}
                                InputLabelProps={{ shrink: false }}
                                variant="outlined"
                                size="small"
                                inputProps={{
                                  value: subTaskTitle,
                                  onChange: (e) => setSubTaskTitle(e.target.value)
                                }}
                                InputProps={{
                                  style: { width: "100%", fontSize: "14px", paddingBottom: "20px" }
                                }}
                                autoComplete="off"
                                autoFocus={true}
                                multiline={false}
                                classes={{
                                  root: classes.txtRootTaskDes,
                                }}
                              />
                              <div style={{ display: "flex", padding: "7px 0" }}>
                                <Button color="primary" size="sm" style={{ margin: 0 }} onClick={() => handleUpdateTaskModal({ list_sub_task: [...showTask.list_sub_task, { name: subTaskTitle, is_done: false }] })}>{text.txtInvite}</Button>
                                <Button size="sm" justIcon={true} color="transparent" style={{ margin: 0 }} onClick={() => { setShowAddSubTask(false), setSubTaskTitle("") }}>
                                  <Icon>close</Icon>
                                </Button>
                              </div>
                            </div>
                          </ClickAwayListener>
                        ) : (
                          <Button size="sm" style={styles.btnTaskTime} onClick={() => setShowAddSubTask(true)}>
                            {text.txtAddSubTask}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes.taskPartContainer}>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <ChatBubbleOutline></ChatBubbleOutline>
                      <p className={classes.txtDesTitle}>{text.txtComment}</p>
                    </div>
                    <div style={{ marginLeft: "-7px" }}>
                      <ClickAwayListener onClickAway={() => { setIsAddComment(false), setNewComment("") }}>
                        <div>
                          <div style={{ display: "flex" }}>
                            <Button size="sm" title={user.name}
                              style={styles.btnMemberComment}>
                              {user.name.split(" ")[0].charAt(0) + user.name.split(" ").at(-1).charAt(0)}
                            </Button>
                            <TextField
                              id="inputTaskComment"
                              placeholder={text.txtWriteComment}
                              InputLabelProps={{ shrink: false }}
                              variant="outlined"
                              size="small"
                              inputProps={{
                                value: newComment,
                                onChange: (e) => setNewComment(e.target.value)
                              }}
                              InputProps={{
                                style: { width: "100%", fontSize: "14px", paddingBottom: isAddComment ? "20px" : "0" }
                              }}
                              autoComplete="off"
                              multiline={false}
                              classes={{
                                root: classes.txtRootTaskComment,
                              }}
                              onFocus={() => setIsAddComment(true)}
                            />
                          </div>
                          {isAddComment && (
                            <div style={{ display: "flex", padding: "7px 0", justifyContent: "end" }}>
                              <Button color="primary" size="sm" style={{ margin: 0 }}
                                onClick={() => handleAddComment()}>{text.txtInvite}</Button>
                            </div>
                          )}
                        </div>
                      </ClickAwayListener>
                      <div style={{ marginTop: "16px" }}>
                        {showTask?.list_comment && (
                          showTask?.list_comment.map((item) => (
                            <div>
                              <div style={{ display: "flex", marginBottom: item?.user?.email == user.email ? "0" : "15px" }}>
                                <Button size="sm"
                                  style={styles.btnMemberComment}>
                                  {item.user.name.split(" ")[0].charAt(0) + item.user.name.split(" ").at(-1).charAt(0)}
                                </Button>
                                <div style={{ width: "100%", marginLeft: "46px" }}>
                                  <div style={{ display: "flex" }}>
                                    <p style={{ margin: 0, fontWeight: "500" }}>{item.user.name}</p>
                                    <p style={{ margin: 0, fontSize: "12px", marginLeft: "5px" }}>{moment.unix(item.create_time).lang("vi").format("DD MMM ") + text.txtAt + moment.unix(item.create_time).lang("vi").format(" HH:mm")}</p>
                                  </div>
                                  <p className={classes.txtCmtContent}>{item.content}</p>
                                  {item?.user?.email == user.email && (
                                    <div style={{ display: "flex", justifyContent: "end" }}>
                                      <p className={classes.txtActionComment} onClick={() => handleUpdateTaskModal({ list_comment: showTask.list_comment.filter((cmt) => cmt != item) })}>{text.txtDelete}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            // <div style={{display: "flex", marginTop: "16px"}}>
                            //   <Button size="sm"
                            //   style={styles.btnMemberComment}>
                            //   {item.user.name.split(" ")[0].charAt(0) + item.user.name.split(" ").at(-1).charAt(0)}  
                            //   </Button>
                            //   <div>
                            //     <p style={{margin: 0, fontWeight: "500", lineHeight: "20px"}}>{item.user.name}</p>
                            //     <p style={{margin: 0, fontSize: "12px"}}>{moment.unix(item.time).lang("vi").format("DD MMM ") + text.txtAt + moment.unix(item.time).lang("vi").format(" HH:mm")}</p>
                            //   </div>
                            //   <p style={{margin: 0, marginLeft: "10px", lineHeight: "20px"}}>{item.content}</p>
                            // </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                </div>
                <div style={{ marginTop: "50px", width: "23%" }}>
                  <div style={{ position: "relative" }}>
                    <Button size="sm" style={styles.btnInviteTask} onClick={() => setShowInviteTask(true)}>
                      <Icon className={classes.icnTaskDetail}>person_outline</Icon>
                      {text.txtMember}
                    </Button>
                    <Poppers
                      open={Boolean(showInviteTask)}
                      anchorEl={showInviteTask}
                      transition
                      disablePortal
                      className={
                        classNames({ [classes.popperClose]: !showInviteTask }) +
                        " " +
                        classes.popperUpdate
                      }
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="show-type"
                          style={{
                            transformOrigin:
                              placement === "bottom" ? "center top" : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={() => handleChangeInviteTask()}>
                              <div>
                                <p className={classes.txtChangeTitle}>{text.txtInviteTitle}</p>
                                <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                                <Autocomplete
                                  multiple
                                  limitTags={2}
                                  size="small"
                                  id="checkboxes-tags-demo"
                                  options={projectData.type == "PUBLIC" ? listUser.filter(me => !showTask?.list_member.some(e => e._id == me._id)) : projectData.list_member.filter(me => !showTask?.list_member.some(e => e._id == me._id))}
                                  disableCloseOnSelect
                                  getOptionLabel={(option) => option.name}
                                  onChange={(event, value) => {
                                    setSelectedMember(value)
                                  }}
                                  renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                      <Checkbox
                                        color="primary"
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: "rgb(43, 117, 252)" }} />}
                                        style={{ marginRight: 8, }}
                                        checked={selected}
                                      />
                                      <div style={{ alignItems: "center" }}>
                                        <p style={{ fontSize: "15px", margin: 0 }}>{option.name}</p>
                                        <p className={classes.txtMemberSelect}>{"@" + option.email.split("@")[0]}</p>
                                      </div>
                                    </React.Fragment>
                                  )}
                                  style={{ margin: "10px 15px" }}
                                  renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label={text.txtMember} placeholder={text.txtAddMember} />
                                  )}
                                />
                                <Button
                                  color="success" size="sm" style={{ width: "270px", margin: "10px 15px" }} onClick={() => handleAddMemberTask()}>
                                  {text.txtInviteTitle}
                                </Button>
                              </div>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Poppers>
                  </div>
                  <div style={{ position: "relative" }}>
                    <Button size="sm" style={styles.btnInviteTask} onClick={() => handleShowTime()}>
                      <Icon className={classes.icnTaskDetail}>schedule</Icon>
                      {text.txtDate}
                    </Button>
                    <Poppers
                      open={Boolean(showTime)}
                      anchorEl={showTime}
                      transition
                      disablePortal
                      className={
                        classNames({ [classes.popperClose]: !showTime }) +
                        " " +
                        classes.popperUpdate
                      }
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="show-type"
                          style={{
                            transformOrigin:
                              placement === "bottom" ? "center top" : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={() => handleHideTime()}>
                              <div>
                                <p className={classes.txtChangeTitle}>{text.txtDate}</p>
                                <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                                <MuiPickersUtilsProvider
                                  utils={DateFnsUtils}
                                  locale={vi}
                                >
                                  <div style={{ margin: "10px" }}>
                                    <div className={classes.flexWrapCenter}>
                                      <Checkbox
                                        color="primary"
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: "rgb(43, 117, 252)" }} />}
                                        style={{ marginTop: "15px" }}
                                        checked={hasTimeFrom}
                                        onChange={() => setHasTimeFrom(!hasTimeFrom)}
                                      />
                                      <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label={text.txtTimeFrom}
                                        value={moment.unix(timeFrom).format()}
                                        onChange={(value) => setTimeFrom(moment(value).unix())}
                                        KeyboardButtonProps={{
                                          "aria-label": "change date",
                                        }}
                                        style={{ margin: "10px", width: "150px" }}
                                      />
                                    </div>
                                    <div className={classes.flexWrapCenter}>
                                      <Checkbox
                                        color="primary"
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: "rgb(43, 117, 252)" }} />}
                                        style={{ marginTop: "15px" }}
                                        checked={hasTimeTo}
                                        onChange={() => setHasTimeTo(!hasTimeTo)}
                                      />
                                      <KeyboardDateTimePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy HH:mm"
                                        ampm={false}
                                        margin="normal"
                                        id="date-picker-inline"
                                        label={text.txtTimeTo}
                                        value={moment.unix(timeTo).format()}
                                        onChange={(value) => setTimeTo(moment(value).unix())}
                                        KeyboardButtonProps={{
                                          "aria-label": "change date",
                                        }}
                                        style={{ margin: "10px", width: "200px" }}
                                      />
                                    </div>
                                  </div>
                                </MuiPickersUtilsProvider>
                                <Button
                                  color="success" size="sm" style={{ width: "270px", margin: "10px 15px" }} onClick={() => handleUpdateTaskModal()}>
                                  {text.txtSave}
                                </Button>
                                {/* <Button size="sm" style={{backgroundColor: "#091e420a",color: "rgba(0, 0, 0, 0.87)", width: "270px", margin: "0 15px", marginBottom: "20px"}} onClick = {() => handleRemoveTime()}>
                                        {text.txtRemove}  
                                    </Button> */}
                              </div>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Poppers>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type="file"
                      id={`file-upload`}
                      multiple
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleAddFile(e);
                      }}
                    />
                    <Button size="sm" style={styles.btnInviteTask} onClick={() => setShowAddAttach(true)}>
                      <Icon className={classes.icnTaskDetail}>attach_file</Icon>
                      {text.txtFile}
                    </Button>
                    <Poppers
                      open={Boolean(showAddAttach)}
                      anchorEl={showAddAttach}
                      transition
                      disablePortal
                      className={
                        classNames({ [classes.popperClose]: !showAddAttach }) +
                        " " +
                        classes.popperUpdate
                      }
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="show-attach"
                          style={{
                            transformOrigin:
                              placement === "bottom" ? "center top" : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={() => { setShowAddAttach(false), setAttachUrlLink("") }}>
                              <div>
                                <p className={classes.txtChangeTitle}>{text.txtAttachFrom}</p>
                                <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                                <MenuList role="menu">
                                  <MenuItem
                                    className={classes.dropdownItem}
                                    onClick={() => openFileDialog()}
                                  >
                                    <p className={classes.txtTypeDesTitle}>{text.txtComputer}</p>
                                  </MenuItem>
                                </MenuList>
                                <div style={{ height: "1px", backgroundColor: "rgb(0, 0, 0, 0.12)", margin: "0 21px" }}></div>
                                <div style={{ margin: "0 15px", marginTop: "10px" }}>
                                  <p style={{ margin: "0", fontWeight: "500", fontSize: "14px" }}>{text.txtAttachLink}</p>
                                  <TextField
                                    id="inputLink"
                                    placeholder={text.txtAttachLinkDes}
                                    InputLabelProps={{ shrink: false }}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    inputProps={{
                                      value: attachUrlLink,
                                      onChange: (e) => setAttachUrlLink(e.target.value),
                                    }}
                                    autoComplete="off"
                                    multiline={false}
                                  />
                                </div>
                                <Button
                                  color="success" size="sm" style={{ margin: "10px 15px" }} onClick={() => handleAttachLink()}>
                                  {text.txtAttach}
                                </Button>
                              </div>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Poppers>
                  </div>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </Fade>
      </Modal>
    </DragDropContext>
  );
}

const styles = {
  btnPro: {
    fontWeight: 500,
    fontSize: "17px",
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "rgba(0, 0, 0, 0.87)",
    textTransform: "none",
    padding: "4px 20px"
  },
  txtRoot: {
    backgroundColor: "white",
    borderRadius: "4px",
    margin: ".3125rem 1px",
  },
  txtRootGroupName: {
    backgroundColor: "white",
    borderRadius: "4px",
    width: "100%",
  },
  txtRootTaskModal: {
    backgroundColor: "white",
    borderRadius: "4px",
    marginLeft: "4px",
    width: "100%"
  },
  txtRootTaskDes: {
    backgroundColor: "white",
    borderRadius: "4px",
    width: "100%"
  },
  txtRootTaskComment: {
    backgroundColor: "white",
    borderRadius: "4px",
    width: "100%",
    marginLeft: "46px"
  },
  txtInput: {
    fontSize: "17px",
    fontWeight: 500,
    padding: "0.44rem 1.25rem"
  },
  txtInputGroupName: {
    fontSize: "14px",
    fontWeight: 500,
    padding: "5px 5px"
  },
  txtInputTaskName: {
    fontSize: "14px",
    padding: "0"
  },
  txtInputTaskModal: {
    fontSize: "20px",
    fontWeight: 500,
    padding: "0px 8px"
  },
  txtInputTaskDes: {
    fontSize: "14px",
    padding: "0",
  },
  btnType: {
    fontSize: "14px",
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "rgba(0, 0, 0, 0.87)",
    textTransform: "none"
  },
  btnTaskTime: {
    fontSize: "14px",
    backgroundColor: "#091e420a",
    color: "rgba(0, 0, 0, 0.87)",
    textTransform: "none"
  },
  btnAddNewGroup: {
    fontSize: "14px",
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "rgba(0, 0, 0, 0.87)",
    textTransform: "none",
    width: "276px",
    margin: 0,
    justifyContent: "start",
    maxHeight: "44px"
  },
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: "#333",
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: "#fff",
    },
    "&.Mui-selected": {
      backgroundColor: primaryColor[0],
      color: "white",
    },
    "&.Mui-selected:hover": {
      backgroundColor: primaryColor[0],
      color: "white",
    },
  },
  popperUpdate: {
    marginTop: "47px",
    zIndex: "9",
    width: "300px"
  },
  popperDelete: {
    marginTop: "30px",
    zIndex: "9",
    width: "300px"
  },
  popperDeleteProject: {
    marginTop: "47px",
    zIndex: "9",
    width: "300px",
    right: "0px",
    left: "unset !important"
  },
  popperDeleteTask: {
    marginTop: "35px",
    zIndex: "9",
    width: "300px"
  },
  icnFilter: {
    fontSize: "14px",
    marginRight: "4px",
  },
  icnTaskDetail: {
    fontSize: "16px",
    marginRight: "4px",
  },
  icnAddNew: {
    fontSize: "17px",
    marginRight: "4px",
  },
  txtChangeTitle: {
    textAlign: "center",
    padding: "10px 0",
    fontSize: "14px",
    margin: "0"
  },
  txtTypeDesTitle: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.3
  },
  txtTypeDes: {
    margin: 0,
    whiteSpace: "break-spaces"
  },
  btnMember: {
    borderRadius: "99px",
    height: "32px",
    width: "32px",
    backgroundColor: "#2b75fc",
    padding: 0,
    fontWeight: "600",
  },
  btnMemberTask: {
    borderRadius: "99px",
    height: "26px",
    width: "26px",
    backgroundColor: "#2b75fc",
    padding: 0,
    fontWeight: "600",
    margin: "0",
    marginRight: "1px"
  },
  btnMemberTaskBig: {
    borderRadius: "99px",
    height: "36px",
    width: "36px",
    backgroundColor: "#2b75fc",
    padding: 0,
    fontWeight: "600",
  },
  btnMemberComment: {
    borderRadius: "99px",
    height: "36px",
    width: "36px",
    backgroundColor: "#2b75fc",
    padding: 0,
    fontWeight: "600",
    margin: 0,
    marginRight: "10px",
    position: "absolute"
  },
  btnMemberTaskMore: {
    borderRadius: "99px",
    height: "26px",
    width: "26px",
    padding: 0,
    fontWeight: "600",
    margin: "0"
  },
  btnMemberLarge: {
    fontSize: "15px",
    borderRadius: "99px",
    height: "65px",
    width: "65px",
    backgroundColor: "#2b75fc",
    padding: 0,
    fontWeight: "600",
  },
  btnInvite: {
    fontSize: "14px",
    textTransform: "none",
    marginLeft: "5px"
  },
  txtMemberName: {
    margin: "10px",
    marginBottom: "0",
    fontSize: "15px",
    fontWeight: "500"
  },
  txtMemberDes: {
    fontSize: "13px",
    margin: "0 10px"
  },
  txtMemberSelect: {
    fontSize: "13px",
    margin: "0"
  },
  taskContainer: {
    backgroundColor: "#dfe3e6",
    borderRadius: "3px",
    width: "260px",
    padding: "8px",
    height: "100%",
    margin: "0 8px 0 0",
    position: "relative",
    //
  },
  titleTaskContainer: {
    "width": "100%",
    "height": "100%",
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "cursor": "pointer"
  },
  txtTaskTitle: {
    fontSize: "14px",
    fontWeight: "500",
    margin: "1px 5px",
    width: "100%"
  },
  boxNewPro: {
    backgroundColor: "white",
    width: "100%",
    height: "auto",
    borderRadius: "3px",
    minHeight: "115px",
    width: "276px",
    maxHeight: "46px"
  },
  txtNewPro: {
    padding: "15px"
  },
  cardContainer: {
    "margin": "0 0 8px 0",
    "position": "relative",
    "maxWidth": "100%",
    "wordWrap": "break-word",
    cursor: "pointer !important"
  },
  btnEditTask: {
    "position": "absolute",
    "right": "5px",
    "top": "0px",
  },
  txtTaskName: {
    fontSize: "14px",
    margin: 0,
    marginBottom: "5px"
  },
  btnAddNewTask: {
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.87)",
    textTransform: "none",
    width: "260px",
    margin: 0,
    justifyContent: "start",
    maxHeight: "46px",
    paddingLeft: "5px",
    position: "absolute",
    bottom: "5px"
  },
  txtDeleteDes: {
    fontSize: "14px",
    margin: "15px",
    marginBottom: "0"
  },
  addnewTaskContainer: {
    position: "absolute",
    width: "260px",
    bottom: "0"
  },
  modal: {
    display: "flex",
    //alignItems: "center",
    justifyContent: "center",
    overflow: "auto"
  },
  modalContainer: {
    width: "768px !important",
    backgroundColor: "#f4f5f7 !important",
    height: "fit-content"
  },
  icnDetail: {
    fontSize: "16px",
    marginRight: "10px",
    color: "#6b778c"
  },
  icnClock: {
    fontSize: "16px",
    marginRight: "5px",
  },
  icnDetailContainer: {
    display: "flex", alignItems: "center", marginRight: "10px", marginTop: "3px"
  },
  flexWrapCenter: {
    display: "flex", flexWrap: "wrap", alignItems: "center"
  },
  flexWrap: {
    display: "flex", flexWrap: "wrap"
  },
  flexContainer: {
    display: "flex", alignItems: "center"
  },
  txtTaskModalTitle: {
    fontSize: "20px",
    fontWeight: "500",
    marginLeft: "12px",
    margin: "0",
    width: "100%"
  },
  txtDesTitle: {
    fontSize: "16px",
    fontWeight: "500",
    marginLeft: "15px",
    margin: "0",
  },
  icnTaskModal: {

  },
  txtInList: {
    margin: 0, marginTop: "5px", marginLeft: "5px", textDecoration: "underline"
  },
  lblTimeStatus: {
    margin: 0,
    marginLeft: "7px",
    borderRadius: "4px",
    padding: "2px 5px",
    color: "white",
    fontSize: "12px"
  },
  txtTaskDes: {
    margin: "0 0 0 36px",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "rgba(9,30,66,.04)",
    padding: "10px 30px 30px 10px",
    borderRadius: "4px",
  },
  txtTaskHaveDes: {
    margin: "0 0 0 36px",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    cursor: "pointer",
  },
  fileContainer: {
    // backgroundColor: "rgba(9,30,66,.04)",
    // borderRadius: "4px",
    // alignItems: "center",
    margin: "5px 0",
    // "boxShadow": "0 1px 2px -1px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%)"
  },
  fileLink: {
    padding: "0 20px",
    width: "100%"
  },
  txtSubTaskTitle: {
    margin: 0,
  },
  subTaskContainer: {
    backgroundColor: "rgba(9,30,66,.04)",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "margin": "5px 0",
    cursor: "pointer"
  },
  subTaskLeaveContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "margin": "5px 0",
    cursor: "pointer"
  },
  txtPercent: {
    margin: "0 10px 0 7px",
    fontSize: "12px",
    width: "29px",
    textAlign: "center"
  },
  txtCmtContent: {
    margin: "0",
    padding: "5px 10px",
    backgroundColor: "white",
    "boxShadow": "0 1px 2px -1px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%)",
    borderRadius: "4px",
  },
  txtActionComment: {
    margin: 0,
    marginTop: "5px",
    cursor: "pointer",
    textDecoration: "underline"
  },
  taskPartContainer: {
    marginTop: "30px"
  },
  btnInviteTask: {
    fontSize: "14px",
    textTransform: "none",
    justifyContent: "start",
    backgroundColor: "#091e420a",
    color: "rgba(0, 0, 0, 0.87)",
    width: "100%"
  }
};

TaskDetailPage.layout = Admin;

export default WithAuthentication(TaskDetailPage);
