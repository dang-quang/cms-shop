import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Collapse from "@material-ui/core/Collapse";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
} from "assets/jss/natcash.js";
import { formatCurrency, formatNumber } from "../../../utilities/utils";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
// connect api
import styles from "assets/jss/natcash/views/inventory/CreateStockProductManualStyle.js";
import { getCreateItemScreen, createInventoryProp, uploadImage, createInventoryItem } from "../../../utilities/ApiManage";
import { NotificationContainer, NotificationManager} from "react-light-notifications";
import { setShowLoader } from "../../../redux/actions/app";
import { Close } from "@material-ui/icons";

function CreateStockProductManual() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [validateItemName, setValidateItemName] = useState(true);
  const [validateSku, setValidateSku] = useState(true);
  const [validateStock, setValidateStock] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [listSellType, setListSellType] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listExportMethod, setListExportMethod] = useState([]);
  const [listStorageType, setListStorageType] = useState([]);
  const filter = createFilterOptions();
  const [values, setValues] = useState({
    item_name: "",
    sku: "",
    bar_code: "",
    reference_code: "",
    purchas_price: "",
    sell_type: "",
    brand: "",
    category: "",
    export_method: "",
    storage_type: "",
    price: "",
    uom: "Cái",
    stock: "",
    width: "",
    length: "",
    height: "",
    weight: "",
    tag: "",
  });

  const PROPERTIES = [
    {
      name: "brand",
      list: listBrand
    },
    {
      name: "category",
      list: listCategory
    },
    {
      name: "export_method",
      list: listExportMethod
    },
    {
      name: "sell_type",
      list: listSellType
    },
    {
      name: "storage_type",
      list: listStorageType
    }
  ]

  const Filter = [
    {
      id: "en",
      value: {
        title: "Products",
        value: [
          "Please choose your primary shop to import its product listings as inventory items",
          "All Inventory Channels and Channel SKUs will be linked if these following conditions are met:",
        ],
        button: ["Reset", "Create new inventory product"],
      },
    },
    {
      id: "vi",
      value: {
        title: "Sản phẩm",
        value: [
          "Chọn gian hàng chính đại diện cho sản phẩm kho",
          "Tự động liên kết các sản phẩm đang đăng bán trên kênh vào sản phẩm kho nếu:",
        ],
        button: ["Đặt lại", "Tạo sản phẩm kho"],
      },
    },
  ];

  const FORM = [
    {
      id: "en",
      value: {
        title: ["Item Infomation", "Additional Information", "Images"],
        value: [
          "Item name",
          "SKU",
          "Barcode",
          "Reference code",
          "Brand",
          "Category",
          "Export method",
          "Sell type",
          "Storage type",
          "Purchase price",
          "Price",
          "UoM",
          "Stock",
          "Width",
          "Length",
          "Height",
          "Weight",
          "Tag",
        ],
        button: ["Reset", "Create new inventory product"],
      },
    },
    {
      id: "vi",
      value: {
        title: ["Thông tin cơ bản", "Thông tin thêm", "Hình ảnh"],
        value: [
          "Tên sản phẩm kho",
          "Mã SKU",
          "Mã barcode",
          "Mã tham chiếu",
          "Thương hiệu",
          "Ngành hàng",
          "Phương thức xuất kho",
          "Loại hình bán hàng",
          "Loại lưu trữ",
          "Giá nhập",
          "Giá bán",
          "ĐTV",
          "Tồn kho",
          "Chiều rộng",
          "Chiều dài",
          "Chiều cao",
          "Cân nặng",
          "Tag",
        ],
        button: ["Đặt lại", "Tạo sản phẩm kho"],
      },
    },
  ];

  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      title: "Create a new inventory product",
      fillter: Filter[0].value,
      form: FORM[0].value,
      txtSuccess: "Success",
      txtCreate: "Create",
      txtFail: "Fail"
    },
    {
      id: "vi",
      title: "Tạo mới sản phẩm kho",
      fillter: Filter[1].value,
      form: FORM[1].value,
      txtSuccess: "Thành công",
      txtCreate: "Tạo mới",
      txtFail: "Thất bại"
    },
  ];
  const [text, setText] = useState(listText[0])

  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);

  useEffect(async () => {
    dispatch(setShowLoader(true));
    const res = await getCreateItemScreen()
    if(res.code == 200){
      setListSellType(res.data.sell_type_list)
      setListBrand(res.data.brand_list)
      setListCategory(res.data.category_list)
      setListExportMethod(res.data.export_method_list)
      setListStorageType(res.data.storage_type_list)
    }
    dispatch(setShowLoader(false));
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      const files = Array.from(e.target.files).map((file) =>file);
      setSelectedFiles((prevFiles) => prevFiles.concat(files));
      setSelectedImages((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };
  const handleRemoveImage = (photo) => {
    const currentIndex = selectedImages.indexOf(photo);
    const newListImages = [...selectedImages];
    const newListFiles = [...selectedFiles];
    newListImages.splice(currentIndex, 1);
    newListFiles.splice(currentIndex, 1);
    setSelectedImages(newListImages)
    setSelectedFiles(newListFiles)
  }

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <div className={classes.imgContainer}>
          <Close className={classes.btnClose} onClick={() => handleRemoveImage(photo)}/>
          <img src={photo} alt="" key={photo} className={classes.imageUpload} />
        </div>
      );
    });
  };

  const handleChangeValue = (prop, value) => {
    setValues({ ...values, [prop]: value });
  };
  const handleCreateProp = async (propName, name, index) => {
    dispatch(setShowLoader(true));
    let obj = {}
    obj[propName + "_name"] = name
    const res = await createInventoryProp(propName, obj)
    if(res.code == 200){
      handleChangeValue(propName, res.data[propName])
      switch(propName){
        case "brand":
          setListBrand(res.data.brand_list)
          break;
        case "category":
          setListCategory(res.data.category_list)
          break;
        case "export_method":
          setListExportMethod(res.data.export_method_list)
          break;
        case "sell_type":
          setListSellType(res.data.sell_type_list)
          break;
        case "storage_type":
          setListBrand(res.data.storage_type_list)
          break;
        default:
          break;
      }
      NotificationManager.success({
        title: text.txtCreate + " " + text.form.value[index + 4],
        message: text.txtSuccess
      });
    }
    else{
      NotificationManager.error({
        title: text.txtCreate + " " + text.form.value[index + 4],
        message: text.txtFail
      });
    }
    dispatch(setShowLoader(false));
  };

  const handelCreateIventoryProduct = async() => {
    if (
      values.item_name.length > 0 &&
      values.sku.length > 0 &&
      values.stock.length > 0
    ) {
      dispatch(setShowLoader(true));
      if(selectedFiles){
        const res = await uploadImage(selectedFiles)
        if(res.code == 200){
          const {item_name, sku, ...newValues} = values;
          let obj = {
            item_name: values.item_name,
            item_sku: values.sku,
            category_id: values.category?.category_id? values.category?.category_id : 0,
            detail: {
              image_list: res.data.image_list,
              ...newValues
            }
          }
          const resCreate = await createInventoryItem(obj)
          if(resCreate.code == 200){
            NotificationManager.success({
              title: text.title,
              message: text.txtSuccess,
            });
          }
          else{
            NotificationManager.error({
              title: text.title,
              message: text.txtFail,
            });
          }
        }
        else{
          NotificationManager.error({
            title: text.title,
            message: text.txtFail,
          });
        }
      }
      setValues({
        item_name: "",
        sku: "",
        bar_code: "",
        reference_code: "",
        purchas_price: "",
        sell_type: "",
        brand: "",
        category: "",
        export_method: "",
        storage_type: "",
        price: "",
        uom: "Cái",
        stock: "",
        width: "",
        length: "",
        height: "",
        weight: "",
        tag: "",
      });
      setValidateItemName(true);
      setValidateSku(true);
      setValidateStock(true);
      setSelectedFiles([])
      setSelectedImages([])
      dispatch(setShowLoader(false));
    } else {
      if (values.item_name.length > 0) {
        setValidateItemName(true);
      } else {
        setValidateItemName(false);
      }
      if (values.sku.length > 0) {
        setValidateSku(true);
      } else {
        setValidateSku(false);
      }
      if (values.stock.length > 0) {
        setValidateStock(true);
      } else {
        setValidateStock(false);
      }
    }
  };

  return (
    <Card>
      <NotificationContainer />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
        <p className={classes.cardCategoryWhite}>{text.subTitle}</p>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div className={classes.itemInfomation}>
          <p className={classes.titleFilter}>{text.form.title[0]}</p>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                error={validateItemName ? false : true}
                id="input1"
                label={text.form.value[0]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.item_name,
                  onChange: (e) => handleChangeValue("item_name", e.target.value),
                }}
                className={classes.marginBottom_20}
                autoComplete="off"
                helperText={validateItemName ? "" : "Incorrect entry"}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <TextField
                error={validateSku ? false : true}
                id="input2"
                label={text.form.value[1]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.sku,
                  onChange: (e) => handleChangeValue("sku", e.target.value),
                }}
                className={classes.marginBottom_20}
                autoComplete="off"
                helperText={validateSku ? "" : "Incorrect entry"}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <TextField
                id="input3"
                label={text.form.value[2]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.barcode,
                  onChange: (e) => handleChangeValue("barcode", e.target.value),
                }}
                className={classes.marginBottom_20}
                autoComplete="off"
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <TextField
                id="input4"
                label={text.form.value[3]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.reference_code,
                  onChange: (e) => handleChangeValue("reference_code", e.target.value),
                }}
                className={classes.marginBottom_20}
                autoComplete="off"
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            {PROPERTIES.map((item, index) => (
              <GridItem xs={12} sm={4} md={4}>
              <FormControl
                variant="outlined"
                className={classes.formControl + " " + classes.marginBottom_20}
                size="small"
              >
                <Autocomplete
                  value={values[item.name]}
                  size="small"
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      var obj={}
                      obj[item.name + "_name"] = newValue
                      handleChangeValue(item.name, obj)
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      handleCreateProp(item.name, newValue.inputValue, index)
                      //handleChangeValue("storageType", {storage_type_name: newValue.inputValue})
                    } else {
                      handleChangeValue(item.name, newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(item.list, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== '') {
                      var fobj = {
                        inputValue: params.inputValue,
                      }
                      fobj[item.name + "_name"] = text.txtCreate + ` "${params.inputValue}"`
                      filtered.push(fobj);
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={item.list}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option[item.name + "_name"];
                  }}
                  renderOption={(option) => option[item.name + "_name"]}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label={text.form.value[index + 4]} variant="outlined" />
                  )}
                />
              </FormControl>
            </GridItem>
            ))}
          </GridContainer>
        </div>
        <div className={classes.additionalInformation}>
          <p className={classes.titleFilter}>{text.form.title[1]}</p>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <FormControl
                fullWidth
                className={classes.marginBottom_20}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount-1">
                  {text.form.value[9]}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount-1"
                  value={values.purchas_price}
                  onChange={(e) => handleChangeValue("purchas_price", e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">₫</InputAdornment>
                  }
                  labelWidth={language == "vi" ? 70 : 110}
                  type="number"
                  autoComplete="off"
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <FormControl
                fullWidth
                className={classes.marginBottom_20}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount-2">
                  {text.form.value[10]}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount-2"
                  value={values.price}
                  onChange={(e) => handleChangeValue("price", e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">₫</InputAdornment>
                  }
                  labelWidth={language == "vi" ? 55 : 40}
                  type="number"
                  autoComplete="off"
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <FormControl
                fullWidth
                className={classes.marginBottom_20}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount-3">
                  {text.form.value[11]}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount-3"
                  value={values.uom}
                  onChange={(e) => handleChangeValue("uom", e.target.value)}
                  labelWidth={30}
                  autoComplete="off"
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <FormControl
                fullWidth
                className={classes.marginBottom_20}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount-4">
                  {text.form.value[12]}
                </InputLabel>
                <OutlinedInput
                  error={validateStock ? false : true}
                  id="outlined-adornment-amount-4"
                  value={values.stock}
                  onChange={(e) => handleChangeValue("stock", e.target.value)}
                  labelWidth={language == "vi" ? 60 : 40}
                  type="number"
                  autoComplete="off"
                  aria-describedby="component-error-text"
                />
                <FormHelperText
                  id="component-error-text"
                  style={{ color: "red" }}
                >
                  {validateStock ? "" : "Incorrect entry"}
                </FormHelperText>
              </FormControl>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={4} md={2}>
              <FormControl
                fullWidth
                className={classes.marginBottom_20}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount-5">
                  {text.form.value[13]}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount-5"
                  value={values.width}
                  onChange={(e) => handleChangeValue("width", e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">cm</InputAdornment>
                  }
                  labelWidth={language == "vi" ? 80 : 40}
                  type="number"
                  autoComplete="off"
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={4} md={2}>
              <FormControl
                fullWidth
                className={classes.marginBottom_20}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount-6">
                  {text.form.value[14]}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount-6"
                  value={values.length}
                  onChange={(e) => handleChangeValue("length", e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">cm</InputAdornment>
                  }
                  labelWidth={language == "vi" ? 70 : 50}
                  type="number"
                  autoComplete="off"
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={4} md={2}>
              <FormControl
                fullWidth
                className={classes.marginBottom_20}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount-7">
                  {text.form.value[15]}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount-7"
                  value={values.height}
                  onChange={(e) => handleChangeValue("height", e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">cm</InputAdornment>
                  }
                  labelWidth={language == "vi" ? 70 : 50}
                  type="number"
                  autoComplete="off"
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={4} md={2}>
              <FormControl
                fullWidth
                className={classes.marginBottom_20}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount-8">
                  {text.form.value[16]}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount-8"
                  value={values.weight}
                  onChange={(e) => handleChangeValue("weight", e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">g</InputAdornment>
                  }
                  labelWidth={language == "vi" ? 70 : 50}
                  type="number"
                  autoComplete="off"
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={8} md={4}>
              <FormControl
                fullWidth
                className={classes.marginBottom_20}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount-9">
                  {text.form.value[17]}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount-9"
                  value={values.tag}
                  onChange={(e) => handleChangeValue("tag", e.target.value)}
                  labelWidth={30}
                  autoComplete="off"
                />
              </FormControl>
            </GridItem>
          </GridContainer>
        </div>
        <div className={classes.Images}>
          <p className={classes.titleFilter}>{text.form.title[2]}</p>
          <div className={classes.imageForm}>
            {renderPhotos(selectedImages)}
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label
              htmlFor="icon-button-file"
              className={classes.imageUpload + " " + classes.imageBtn}
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className={classes.filterFooter}>
          <Button
            color="primary"
            onClick={() => {
              handelCreateIventoryProduct();
            }}
          >
            {text.fillter.button[1]}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

CreateStockProductManual.layout = Admin;

export default WithAuthentication(CreateStockProductManual);
