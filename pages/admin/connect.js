import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import instagramImg from "assets/img/channel/instagram.png";
import lazadaImg from "assets/img/channel/lazada.png";
import messengerImg from "assets/img/channel/messenger.png";
import sendoImg from "assets/img/channel/sendo.png";
import shopeeImg from "assets/img/channel/shopee.png";
import tikiImg from "assets/img/channel/tiki.jpg";
import vosoImg from "assets/img/channel/voso.png";
import zaloImg from "assets/img/channel/zalo.png";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import { CHANNEL } from "../../redux/actions/app";
import { getShopConnectURL } from "../../utilities/ApiManage";

function ConnectPage() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [selected, setSelected] = useState("");
  const language = useSelector((state) => state.app.language);
  const [text, setText] = useState({
    id: "en",
    title: "Connect sales channels",
    btnConnect: "Connect",
    txtAtt: "Attention: How to authenticate depends on each channel",
  });
  const listImgLine1 = [
    {
      id: 1,
      name: "Shopee",
      src: shopeeImg,
    },
    {
      id: 2,
      name: "Lazada",
      src: lazadaImg,
    },
    {
      id: 3,
      name: "Tiki",
      src: tikiImg,
    },
    {
      id: 4,
      name: "Sendo",
      src: sendoImg,
    },
  ];
  const listImgLine2 = [
    {
      id: 5,
      name: "Instagram",
      src: instagramImg,
    },
    {
      id: 6,
      name: "Zalo",
      src: zaloImg,
    },
    {
      id: 7,
      name: "Messenger",
      src: messengerImg,
    },
    {
      id: 8,
      name: "Voso",
      src: vosoImg,
    },
  ];
  const listText = [
    {
      id: "en",
      title: "Connect sales channels",
      btnConnect: "Connect",
      txtAtt: "Attention: How to authenticate depends on each channel",
    },
    {
      id: "vi",
      title: "Kết nối kênh bán hàng",
      btnConnect: "Kết nối",
      txtAtt: "Lưu ý: Cách xác thực tùy thuộc vào từng đơn vị liên kết",
    },
  ];
  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);

  const channel_selected = useSelector((state) => state.app.channel);
  const dispatch = useDispatch();
  const handleChannel = (channel) => {
    dispatch({ type: CHANNEL, channel });
  };

  const handleConnect = async () => {
    switch (selected.id) {
      case 1: {
        handleChannel("shopee");
        var res = await getShopConnectURL("shopee");
        if (res) {
          var url = res;
          const win = window.open(url, "_blank");
          if (win != null) {
            win.focus();
          }
        }
        return;
      }
      case 2: {
        handleChannel("lazada");
        var res = await getShopConnectURL("lazada");
        if (res) {
          var url = res;
          const win = window.open(url, "_blank");
          if (win != null) {
            win.focus();
          }
        }
        return;
      }
      default: {
        handleChannel("");
        return;
      }
    }
  };
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      <CardBody className={classes.bodyContainer}>
        <div className={classes.typo}>
          {listImgLine1.map((item, index) => (
            <Button
              color={selected.id == item.id ? "primary" : "white"}
              justIcon={true}
              className={classes.itemsContainer}
              onClick={() => setSelected(item)}
            >
              <img className={classes.img} src={item.src} />
            </Button>
          ))}
        </div>
        <div className={classes.typo}>
          {listImgLine2.map((item, index) => (
            <Button
              color={selected.id == item.id ? "primary" : "white"}
              justIcon={true}
              className={classes.itemsContainer}
              onClick={() => setSelected(item)}
            >
              <img className={classes.img} src={item.src} />
            </Button>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <div className={classes.footerContainer}>
          <Button color="primary" onClick={() => handleConnect()}>
            {text.btnConnect}
          </Button>
          <p>{text.txtAtt}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

const styles = {
  typo: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    minWidth: "300px",
    justifyContent: "center",
    margin: "30px",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  footerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
  },
  img: {
    width: "60px",
    height: "60px",
    position: "absolute",
    borderRadius: "10px",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  itemsContainer: {
    width: "80px !important",
    height: "80px !important",
    margin: "auto !important",
    cursor: "pointer",
    position: "relative !important",
  },
};

ConnectPage.layout = Admin;

export default WithAuthentication(ConnectPage);
