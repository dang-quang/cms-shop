import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import moment from "moment";
// @material-ui/core components
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {primaryColor,} from "assets/jss/natcash.js";
import {formatCurrency, formatNumber} from "../../../utilities/utils";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import CustomInput from "components/CustomInput/CustomInput.js";
import Search from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import GridContainer from "components/Grid/GridContainer.js";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import {Icon} from "@material-ui/core";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import DateFnsUtils from "@date-io/date-fns";
import vi from "date-fns/locale/vi";
import Poppers from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classNames from "classnames";
import {getProductList, getProductScreen} from "../../../utilities/ApiManage";
import {setShowLoader} from "../../../redux/actions/app";
import Pagination from "@material-ui/lab/Pagination";
import {useTranslation} from "react-i18next";
import styles from "assets/jss/natcash/views/productApproval/productApprovalStyle";
import {NotificationContainer, NotificationManager} from "react-light-notifications";


const fakeData = [
        {
            "publish": 1634893813,
            "update_time": 1634893813,
            "id": "617280b36748d50016a196e9",
            "shop_id": 119716298,
            "item_id": 1840808632,
            "category_id": 101007,
            "code": "DCG-1235",
            "item_name": "Đồ chơi xếp hình Antona - Vườn thú diệu kỳ",
            "description": "Được lấy cảm hứng từ thế giới động vật và sở thích của các bé, đồ chơi xếp hình Antona - Vườn thú diệu kỳ không chỉ giúp các bé khám phá thế giới động vật ngoài kia mà còn đưa các bé về với thiên nhiên, khám phá những điều tự nhiên nhất.\nĐồ chơi xếp hình Antona - Vườn thú diệu kỳ với ưu điểm\n- Sản phẩm được làm từ 100% nhựa nguyên sinh an toàn\n- Thuộc dòng đồ chơi xếp hình thông minh của Công ty CP TBKT và Đồ Chơi An Toàn Việt Nam\n- Giúp bé phát triển tối đa khả năng tư duy và tính sáng tạo\n- Rèn luyện sự tỉ mỉ, tìm tòi khám phá cho các bé\n- Tăng cường khả năng vận động và phối hợp giữa các bộ phận của cơ thể.\n- Kích thước hộp: 21 x 16 x 8 cm\n- Số chi tiết: 66 miếng\n- Độ tuổi: 3 tuổi trở lên\n- Xuất Xứ: Việt Nam\n- Thương Hiệu; Antona\n\n",
            "detail": {
                "image": {
                    "image_url_list": [
                        "https://cf.shopee.vn/file/1f9ecdcff02a880ef4fc1224d8a3c1f4",
                        "https://cf.shopee.vn/file/a8de7850f687c0ee3873598c08ee5b6e",
                        "https://cf.shopee.vn/file/1ba3afa80dc65e279a530578092c42fc"
                    ],
                },
            },
            "shop_icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
            "shop_code": "ANLA",
            "category": "Toys",
            "price": "2000",
            "status": "Approve",
            "createBy": "admin",
            "stt": 1
        },
        {
            "publish": 1634893813,
            "update_time": 1634893813,
            "id": "617280be6748d50016a19ab5",
            "shop_id": 119716298,
            "item_id": 1840409591,
            "category_id": 101010,
            "item_name": "Ô tô thả hình gỗ  Kitty cho bé",
            "description": "Đồ chơi ô tô thả hình gỗ giúp bé dễ dàng nhận biết, sự giống và khác nhau giữa các hình khối, màu sắc:\nCác hình khối toán học đơn giản: vuông, tròn, chữ nhật, tam giác,...\nMàu sắc cơ bản: Xanh, đỏ, vàng,..\nBé kéo xe đi xung quanh nhà, bé sẽ rất vui khi trong xe có rất nhiều hình khác nhau với những màu sắc khác nhau.\nPhát triển tư duy logic, suy luận hình ảnh cho bé qua việc bé phải tìm đúng hình mới có thể đút vừa lọt vào nhà gỗ.\nNếu không tìm đúng hình sẽ không chui lọt.\n Đồ chơi nhà gỗ thả hình sẽ là món quà tặng sinh nhật, quà noel cho bé rất phù hợp. Đặc biệt là các bé từ 2-4 tuổi, giúp bé nhận biết màu sắc, hình khối\nThương hiệu : Kitty\n#do_choi_go, #oto_tha_hinh_go_kitty, ##oto_go_tha_hinh",
            "code": "DCG-1235",
            "detail": {
                "image": {
                    "image_url_list": [
                        "https://cf.shopee.vn/file/bff293bb5f8c812f532cc9ecbb761d31",
                        "https://cf.shopee.vn/file/6d7a719e99814f6fa8a84ea5758b9bbf",
                        "https://cf.shopee.vn/file/85683d77371fc366e942eaacc023cb4f",
                        "https://cf.shopee.vn/file/7f9f66d1d56509f2e9a7034710511709"
                    ],
                },
            },
            "shop_icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
            "shop_code": "ANLA",
            "category": "Toys",
            "price": "2000",
            "status": "Approve",
            "createBy": "admin",
            "stt": 2
        },
        {
            "publish": 1634893813,
            "update_time": 1634893813,
            "id": "617280c16748d50016a19bbb",
            "shop_id": 119716298,
            "item_id": 1831065493,
            "category_id": 101007,
            "item_name": "Xếp hình mầm non 68 chi tiết Anto60",
            "description": "Đồ chơi ghép hình sẽ giúp bé phát triển vận động và rèn luyện sự khéo léo trong các thao tác. Cùng với những màu sắc, hình khối đa dạng, bé dần tiếp cận và hiểu biết thêm về thế giới xung quanh mình trong quá trình chơi. Đồng thời, bé trở nên linh hoạt trong việc nhận dạng màu sắc và kích thước các vòng tròn, từ đó bé có thể xếp chúng theo thứ tự nhỏ dần tạo thành ngọn tháp cân đối, vừa mang tính tìm tòi vừa rèn luyện khả năng nhận biết kích thước đồ vật cho bé.\nXếp hình mầm non 68 chi tiết Anto60 mà Shop Trẻ Thơ giới thiệu hôm nay là một gợi ý thú vị, bố mẹ có thể tặng cho bé một món quà giúp phát triển toàn diện cả về thể chất và trí tuệ.\nThông tin chi tiết sản phẩm:\n- Bộ đồ chơi cho bé gồm 68 chi tiết dạng khối và cataloge hướng dẫn ghép hình theo chủ điểm mầm non.\n- Giúp bé nhận biết và phân biệt hình khối, màu sắc\n- Kích thích khả năng sáng tạo, tư duy logic và tính tự chủ của bé\n- Giúp kéo gần khoảng cách gia đình, bố mẹ sẽ hiểu con cái hơn thông qua vui chơi\n- Bé phát triển khả năng tư duy, sáng tạo khi vui chơi cùng bố mẹ.\n- Tăng cường khả năng vận động cho bé.\n- Sản phẩm được sản xuất 100% bằng nhựa nguyên sinh ABS, và màu an toàn không gây độc hại cho bé. Sản phẩm đã được kiểm định chất lượng và chứng nhận hợp quy tại Tổng cục tiêu chuẩn đo lường chất lượng I.\n- Sản phẩm được đóng trong hộp giấy và có hướng dẫn kèm theo.\n- Sản phẩm là món quà thú vị cho bé yêu của bạn\n- Sản phẩm phù hợp với bé từ 2 trở lên.\n- Xuất xứ: Việt Nam\n- Cách chơi: Bé lắp ghép các mô hình theo chủ điểm mầm non như phương tiện giao thông, quê hương đất nước… Bé nhỏ có thể nhận biết màu sắc, hình khối chơi mô hình dạng chuyển động…\nThương hiệu : Anto\n#xep_hinh_mam_non, #anto60, #xep_hinh_68_chi_tiet",
            "code": "DCN-589684",
            "detail": {
                "image": {
                    "image_url_list": [
                        "https://cf.shopee.vn/file/9498084241e17199598f30104225678a",
                        "https://cf.shopee.vn/file/e41e65795dc979c67d504daa803241e9",
                        "https://cf.shopee.vn/file/0b3e1c8a972cf2237b3e2c6c42aa32ed"
                    ],
                },
            },
            "shop_icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
            "shop_code": "ANLA",
            "category": "Toys",
            "price": "2000",
            "status": "Not approve",
            "createBy": "admin",
            "stt": 3
        },
        {
            "publish": 1634893813,
            "update_time": 1634893813,
            "id": "617280bf6748d50016a19ac5",
            "shop_id": 119716298,
            "item_id": 1840422992,
            "category_id": 101735,
            "item_name": "Đồ chơi gỗ xe cũi thả hình Gold Cat",
            "description": "Xe cũi thả hình bằng gỗ phát triển khả ghi nhớ ở trẻ thông qua việc làm quen và nhận biết với những hình khống đơn giản như hình vuông, hình chứ nhật tăng khả năng nhớ của bé. Xe cũi được làm từ gỗ an toàn, hàng Việt Nam chất lượng cao. Xe cũi thả hình cũng góp phần làm quen với những con số giúp bé học toán thông minh hơn về lâu dài.\nXe cũi thả hình bằng gỗ - hàng Việt Nam\n- Gồm 1 xe cũi xinh xắn và nhiều hình khối giúp bé chơi và học toán bằng thiết kế đơn giả giúp bé chơi rất dàng. Nóc xe có 5 lỗ hình vuông, tam giác, tròn, chữ nhật và bán nguyệt. .\n- Kích thước 150x200x150mm. Nan cũi Ø10mm, có dây kéo.\n- Dành cho bé từ 1- 3 tuổi\n- Chi tiết sản phẩm rất đơn giản giúp bé nhận biết và phân biệt các hình khối đơn giản như hình vuông, hình chữ nhật,…\n- Phát triển tư duy logic và trí tưởng tượng phong phú.\n- Xe cũi được thiết kế bằng chất liệu gỗ cao cấp, tuyệt đối an toàn cho bé.\n- Lớp sơn bên ngoài là loại sơn chuyền dùng để sản xuất đồ chơi trẻ em , không phai, không dính màu.\n- Bố mẹ có thể cùng bé chơi trò chơi này, hướng dẫn bé đâu là hình vuông, hình tròn,...\n- Món quà ý nghĩa cho tuổi thần tiên của bé.\nHướng dẫn cách chơi\nBé chỉ cần tìm các khối hình tương ứng và thả vào các lỗ trên nóc xe, nếu không tìm đúng hình sẽ không chui lọt.\n#do_choi_go_xe_cui_tha_hinh, #xe_cui_tha_hinh_gold_cat",
            "code": "DCG-139",
            "detail": {
                "image": {
                    "image_url_list": [
                        "https://cf.shopee.vn/file/375e544eacbf9822bbe8f1ea8bc10a85",
                        "https://cf.shopee.vn/file/24a3b65e4ce82f02e21f9b7e6a68930e",
                        "https://cf.shopee.vn/file/2165f8b6406b05f9910493030e6f6534"
                    ],
                },
            },
            "shop_icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
            "shop_code": "ANLA",
            "category": "Toys",
            "price": "2000",
            "status": "Not approve",
            "createBy": "admin",
            "stt": 4
        },
        {
            "publish": 1634893813,
            "update_time": 1634893813,
            "id": "617280bf6748d50016a19abf",
            "shop_id": 119716298,
            "item_id": 1840723666,
            "category_id": 101721,
            "item_name": "Đồ chơi xếp hình Antona No.290 - Ngôi nhà ngọt ngào",
            "description": "Đồ chơi xếp hình Antona No.290 - Ngôi nhà ngọt ngào gồm 33 chi tiết được làm từ chất liệu nhựa nguyên sinh, không chứa hóa chất độc hại, an toàn cho bé. Đặc biệt, miếng ghép to nên các bé từ 3 tuổi trở lên có thể chơi và lắp ráp, giúp các bé được cảm nhận và thể hiện tình yêu thương của mình và gia đình.\nĐồ chơi xếp hình Antona No.290 - Ngôi nhà ngọt ngào với ưu điểm\n- Sản phẩm được làm từ 100% nhựa nguyên sinh an toàn\n- Được lấy cảm hứng từ tình yêu và hạnh phúc của các bé gái, Ngôi nhà ngọt ngào là nơi sẽ giúp các bé được cảm nhận và thể hiện tình yêu thương của mình và gia đình.\n- Giúp bé phát triển tối đa khả năng tư duy và tính sáng tạo\n- Rèn luyện sự tỉ mỉ, tìm tòi khám phá cho các bé\n- Tăng cường khả năng vận động và phối hợp giữa các bộ phận của cơ thể.\n- Số chi tiết: 33 chi tiết\n- Độ tuổi: 3 tuổi trở lên\n- Hàng Việt Nam chất lượng cao",
            "code": "DCN-596207",
            "detail": {
                "image": {
                    "image_url_list": [
                        "https://cf.shopee.vn/file/a98fc101f19a6d7f312d0ecb0de0ffcf",
                        "https://cf.shopee.vn/file/cde3037d23b2b80fa28be0f0be2c0d87",
                        "https://cf.shopee.vn/file/6da0ddc174b57cfa2fc8568c5b18dc0d"
                    ]
                },
            },
            "shop_icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
            "shop_code": "ANLA",
            "category": "Toys",
            "price": "2000",
            "status": "Not approve",
            "createBy": "admin",
            "stt": 5
        },
        {
            "publish": 1634893813,
            "update_time": 1634893813,
            "id": "617280b36748d50016a196eb",
            "shop_id": 119716298,
            "item_id": 1830936840,
            "category_id": 101717,
            "item_name": "Bộ đồ chơi xúc xắc hộp Antona 5 chiếc",
            "description": "- Sản phẩm được làm hoàn toàn bằng nhựa và sơn an toàn không độc hại nên rất an toàn cho bé khi chơi.\n- Bộ sản phẩm được làm bằng nhựa chắc chắn, có nhiều màu sắc sinh động, được đóng trong túi.\nCông dụng của sản phẩm:\n- Xúc xắc trẻ em là bộ đồ chơi vô cùng vui nhộn mang đến cho bé cảm giác rất thích thú.\n- Bộ sản phẩm không những mang lại cảm giác thích thú mà còn giúp bé phân biệt màu sắc và rèn luyện\ncơ bắp từ rất sớm.\n- Các hạt nhựa nhiều màu giúp bé phản xạ trực quan với màu sắc và phát triển thị giác.\nThương hiệu : Antona\nXuất Xứ: Việt Nam",
            "code": "DCN-1784",
            "detail": {
                "image": {
                    "image_url_list": [
                        "https://cf.shopee.vn/file/0680ec0dbf0dd2d1afb2f51846c4881c",
                        "https://cf.shopee.vn/file/01393860b80386572126d8fdf106e3cc",
                        "https://cf.shopee.vn/file/4cccb6b46e899e5437c889fedc2ca862",
                        "https://cf.shopee.vn/file/832eb007cbf55f70ba4b2e1f5e377170"
                    ],
                },
            },
            "shop_icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
            "shop_code": "ANLA",
            "category": "Toys",
            "price": "2000",
            "status": "Not approve",
            "createBy": "admin",
            "stt": 6
        },
        {
            "publish": 1634893813,
            "update_time": 1634893813,
            "id": "617280b96748d50016a198e5",
            "shop_id": 119716298,
            "item_id": 2960594115,
            "category_id": 100945,
            "item_name": "Địu cao cấp Tâm An cho bé từ 3 tháng, chất vải mềm thoáng khí",
            "description": "Địu cao cấp Tâm An thích hợp cho các bé từ 2 đến 18 tháng nặng dưới 14kg (không dùng cho các bé khi chưa cứng cổ). Địu em bé được sản xuất tại Việt Nam với đường may và thiết kế chắc chắn, đảm bảo an toàn cho bé cũng như tiện dụng khi đi ra ngoài cho mẹ. \nThông tin chi tiết sản phẩm\n- Tên sản phẩm: Địu cao cấp Tâm An cho bé\n- Chất liệu: cotton, đệm mỏng\n- Màu sắc: xanh nhạt, xanh dương đậm, cam, đỏ\n- Độ tuổi: trên 3 tháng (bé cứng cổ)\n- Xuất xứ: Việt Nam\n- Quy cách đóng gói: 1 chiếc/ 1 túi\n- Sản phẩm địu Tâm An rất an toàn cho bé, được thiết kế dựa trên những nghiên cứu về cơ thể con người\n- Đảm bảo an toàn cho bé, tiện dụng khi sử dụng\n- Luôn tạo cho bé cảm giác an toàn và thoải mái nhất.\nHướng dẫn sử dụng:\n- Khi sử dụng trước hết phải đeo đỗ địu lên người, điều chỉnh dây đeo, bấm khóa an toàn. Dùng 2 tay đặt 2 bên và đẩy đồ địu ra phía trước để kiểm tra là khóa an toàn đã được chốt chắc, Sau đó nhấc em bé lên bằng hai tay, cho 2 chân bé vào trước rồi đặt bé ngồi vào đầu địu.\n- Khi có người giúp, thì đặt bé ngồi vào địu trước, giữ chặt bé và bảo người giúp khóa chốt an toàn phía sau lưng.\n- Trong khi mang địu người sử dụng không nên bỏ tay ra cho đến khi chắc chắn khóa an toàn đã được chốt chặt\nChú ý\n- Kiểm tra địu và các chi tiết trước khi sử dụng.\n- Chỉ sử dụng sau khi bé bú được khoảng 30 phút để bé được thoải mái\n- Không nên dùng thuốc tẩy và bột giặt tẩy mạnh khi giặt để tránh dị ứng cho bé.\n- Sản phẩm địu trẻ em sx Việt Nam\nMẹ hãy lựa chọn cho bé loại địu phù hợp để con cảm thấy thoải mái nhất đồng thời giúp bố mẹ yên tâm khi đưa bé đi chơi xa hoặc đi dã ngoại nhé.\n- Thương hiệu: Tâm An - Việt Nam\nThương hiệu : Tâm An",
            "code": "DIU-041",
            "detail": {
                "image": {
                    "image_url_list": [
                        "https://cf.shopee.vn/file/46c87617a770113994fe4d96f18bce7a",
                        "https://cf.shopee.vn/file/abbf056df69eb1b809eee308fec2e170",
                        "https://cf.shopee.vn/file/ddf9c5b9b4ea3128899becb25abfee77"
                    ],
                },
            },
            "shop_icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
            "shop_code": "ANLA",
            "category": "Toys",
            "price": "2000",
            "status": "Not approve",
            "createBy": "admin",
            "stt": 7
        },
        {
            "publish": 1634893813,
            "update_time": 1634893813,
            "id": "617280b36748d50016a196e7",
            "shop_id": 119716298,
            "item_id": 1865189464,
            "category_id": 101703,
            "item_name": "Khay nhựa trữ đông thức ăn Song Long (7 viên)",
            "description": "Khay nhựa trữ đông thức ăn Song Long (7 viên) với thiết kế tiện dụng có thể dùng để làm đá lạnh, trữ thức ăn dặm cho bé hoặc để làm các viên thạch sẽ là đồ dùng không thể thiếu trong mỗi gia đình. Khay được làm từ chất liệu nhựa PP, không chứa BPA độc hại, chịu được nhiệt độ thấp cũng như có thể dùng trong lò vi sóng. \nThông tin nổi bật của khay nhựa trữ đông thức ăn Song Long (7 viên)\n- Chất liệu: nhựa PP  không chứa BPA đảm bảo an toàn vệ sinh không gây độc hại, khay làm đá có đặc điểm rất dẻo và bền.\n- Thiết kế gồm 7 ngăn nhỏ để bạn dùng để trữ thức ăn cho bé, làm đá lạnh\n- Khay có nắp đập hợp vệ sinh, đảm bảo giữ mùi cho thực phẩm cũng như không làm tủ lạnh bị mùi\n- Khay có thiết kế dẻo, nên bạn có thể vặn thoải mái mà không sợ bị gãy hỏng như các khay đá thông thường.\n- Màu sắc: trắng\n- Kích thước: 22 x 5,5 x 3,5cm (Dài x Rộng x Cao)\n- Xuất xứ: Hàng Việt Nam\n- Thương Hiệu: Song Long",
            "code": "HN-348",
            "detail": {
                "image": {
                    "image_url_list": [
                        "https://cf.shopee.vn/file/313bcd25fd6ea2820b7f45bfa0cb8037",
                        "https://cf.shopee.vn/file/2bbebe63213c0fd4f0ae2e1e72c840a2",
                        "https://cf.shopee.vn/file/93986368e71ac34ef315d7ccca15ec70"
                    ],
                },
            },
            "shop_icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
            "shop_code": "ANLA",
            "category": "Toys",
            "price": "2000",
            "status": "Not approve",
            "createBy": "admin",
            "stt": 8
        },
        {
            "publish": 1634893813,
            "update_time": 1634893813,
            "id": "617280be6748d50016a19a95",
            "shop_id": 119716298,
            "item_id": 1831028206,
            "category_id": 101735,
            "item_name": "Đồ chơi xe thả hình mầm non Anto15",
            "description": "Đồ chơi xe thả hình mầm non Anto15 là một sản phẩm đồ chơi “4 in 1” với các tính năng vận động và chơi đơn giản nhưng vô cùng thu hút các bé. Chất liệu nhựa nguyên sinh PP, có tính dẻo, đàn hồi tốt và an toàn đối với trẻ nhỏ, thích hợp làm quà tặng trong các dịp đặc biệt.\nĐặc tính nổi bật của xe thả hình mầm non Anto15\n- Chất liệu: Nhựa PP, không chất phụ gia, không bavia sắc cạnh đem đến sự an toàn tuyệt đối cho bé\n- Kích thước xe: 25x15x16cm (DxRxC)\n- Thiết kế bánh xe to chuyển động trơn tru, có dây để dắt xe.\n- Kết hợp với các khối thả hình nhiều màu sắc tạo nên 4 cách chơi khác nhau.\n- Giúp bé rèn luyện óc tư duy, sự khéo léo và biết cách nhận biết nhiều loại hình khối, màu sắc.\n- Độ tuổi: 2 tuổi trở lên\n- Xuất xứ: Việt Nam\n#do_choi_xe_tha_hinh, #do_choi_antona, #anto15",
            "code": "DCN-595181",
            "detail": {
                "image": {
                    "image_url_list": [
                        "https://cf.shopee.vn/file/4aac3ca3505c265396ef8e7c48cee90a",
                        "https://cf.shopee.vn/file/e1b8eb5e5b8b3d0081f4b2b118a6a74f",
                        "https://cf.shopee.vn/file/0393abc2a48ea420afa1a2a58fd08ad7"
                    ],
                },
            },
            "shop_icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
            "shop_code": "ANLA",
            "category": "Toys",
            "price": "23000",
            "status": "Approve",
            "createBy": "admin",
            "stt": 9
        }
    ];


function ProductApproval() {
    const dispatch = useDispatch();
    const useStyles = makeStyles(styles);
    const useAdminStyles = makeStyles(adminStyles);
    const useTableStyles = makeStyles(tableStyles);
    const adminClasses = useAdminStyles();
    const classes = useStyles();
    const tableClasses = useTableStyles();
    const useTaskStyles = makeStyles(taskStyles);
    const taskClasses = useTaskStyles();
    const useDashStyles = makeStyles(dashStyles);
    const dashClasses = useDashStyles();
    const [showFilter2, setShowFilter2] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [doFilter, setDoFilter] = useState(0);
    const [filterDate, setFilterDate] = useState(false);
    const [value, setValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [doSearch, setDoSearch] = useState(false);
    const [txtSearch, setTxtSearch] = useState("");
    const {t} = useTranslation();

    const TABLE_HEAD = [
        t('qrManagement.stt'),
        t('name'),
        t('sideBar.category'),
        t('price'),
        t('shop'),
        t('status'),
        t('productApproval.createBy'),
        t('qrManagement.publishTime'),
    ];

    const [data, setData] = useState([]);
    const [listRadio, setListRadio] = useState([
        {
            id: "1",
            label: "Tất cả sản phẩm",
        },
        {
            id: "2",
            label: "Tất cả sản phẩm theo bộ lọc hiện tại",
        },
        {
            id: "3",
            label: "Sản phẩm đang chọn",
        },
    ]);

    const [checked, setChecked] = useState([]);
    const [showProduct, setShowProduct] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [fromDate, setFromDate] = useState(moment().subtract(30, "days").format());
    const [toDate, setToDate] = useState(moment().format());
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => {
                setIsMobile(window.innerWidth < 1200);
            },
            false
        );
    }, []);

    // useEffect(async () => {
    //     dispatch(setShowLoader(true))
    //     // const res = await getProductScreen()
    //     // setData(res.data.item_list)
    //     // setTotalPage(res.data.data_page.total_page)
    //     dispatch(setShowLoader(false))
    // }, []);
    //
    // useEffect(async () => {
    //     dispatch(setShowLoader(true));
    //     setChecked([]);
    //     let params = {};
    //     params.current_page = currentPage;
    //     if (txtSearch) {
    //         params.keyword = txtSearch;
    //     }
    //     if (doFilter) {
    //         params.time_from = moment(fromDate).unix();
    //         params.time_to = moment(toDate).unix();
    //     }
    //
    //     // const res = await getProductList(params)
    //     // setData(res.data.item_list)
    //     // setTotalPage(res.data.data_page.total_page)
    //     dispatch(setShowLoader(false))
    // }, [doSearch, doFilter, currentPage]);

    const resetFilterDate = () => {
        setFromDate(moment().subtract(30, "days").format());
        setToDate(moment().format());
        setFilterDate(false);
        setDoFilter(0);
    };
    const handleSelectPage = (event, value) => {
        setCurrentPage(value);
    };

    const handleInputSearch = (event) => {
        setTxtSearch(event.target.value);
        setCurrentPage(1);
    };
    const handleCheckAll = () => {
        if (isCheckAll) {
            setIsCheckAll(false);
            setChecked([]);
        } else {
            setIsCheckAll(true);
            setChecked(data);
        }
    };
    const handleToggle = (item) => {
        const currentIndex = checked.indexOf(item);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(item);
        } else {
            setIsCheckAll(false);
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    const handleShowProduct = (item) => {
        const currentIndex = showProduct.indexOf(item);
        const newShowProduct = [...showProduct];
        if (currentIndex === -1) {
            newShowProduct.push(item);
        } else {
            newShowProduct.splice(currentIndex, 1);
        }
        setShowProduct(newShowProduct);
    };

    const CustomRadio = withStyles({
        root: {
            color: "gray",
            "&$checked": {
                color: "#f96606",
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);
    const handleUpdate = () => {
        setShowUpdate(false);
    };

    const handleApprove = () => {
        setShowUpdate(false);
        NotificationManager.success({
            title: "Product Approval",
            message: "Successful",
        });
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const productInfo = (item) => {
        return (
            <div className={classes.proContainer}>
                <img className={classes.proImg}
                     src={item?.detail?.image?.image_url_list ? item?.detail?.image?.image_url_list[0] : item?.detail?.images[0]}/>
                <div className={classes.proInfoContainer}>
                    {/*<Link href={"/admin/product/" + item.item_id}>*/}
                        <a
                            target="_blank"
                            className={tableClasses.tableCell + " " + classes.txtProductName}
                        >
                            {item.item_name}
                        </a>
                    {/*</Link>*/}
                    <div className={classes.proContainer}>
                        <div className={classes.shopInfoContainer}>
                            <img className={classes.shopImg} src={item?.shop_icon}/>
                            <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                                {item?.shop_code}
                            </p>
                        </div>
                        <div className={classes.shopInfoContainer}>
                            <Icon className={classes.codeIcon}>crop_free</Icon>
                            <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                                {item.code}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const productTypeInfo = (item, index) => {
        var name = "";
        item.tier_index.map((ti, idx) => {
            name =
                name +
                data[index].model_data.tier_variation[idx].option_list[ti].option +
                ",";
        });
        name = name.slice(0, -1);
        return (
            <div className={classes.proContainer} style={{marginLeft: "40px"}}>
                <img
                    className={classes.proImg}
                    src={data[index].image.image_url_list[0]}
                />
                <div className={classes.proInfoContainer}>
                    <p
                        className={tableClasses.tableCell}
                        style={{
                            fontSize: "15px",
                            padding: "0",
                            margin: "0",
                            marginBottom: "4px",
                        }}
                    >
                        {name}
                    </p>
                    <div className={classes.proContainer}>
                        <div className={classes.shopInfoContainer}>
                            <Icon className={classes.codeIcon}>crop_free</Icon>
                            <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                                {item?.model_sku}
                            </p>
                        </div>
                    </div>
                    {item?.is_connect && (
                        <p className={tableClasses.tableCell + " " + classes.txtLienKet}>
                            {t('productApproval.noLink')}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    const renderProduct = (item, index) => {
        return (
            <React.Fragment>
                <TableRow
                    key={index}
                    className={tableClasses.tableBodyRow}
                    style={{
                        backgroundColor: checked.indexOf(item) !== -1 ? "#fff6f0" : "#fff",
                    }}
                >
                    <TableCell className={tableClasses.tableCell}>
                        <Checkbox
                            checked={checked.indexOf(item) !== -1}
                            tabIndex={-1}
                            onClick={() => handleToggle(item)}
                            checkedIcon={<Check className={taskClasses.checkedIcon}/>}
                            icon={<Check className={taskClasses.uncheckedIcon}/>}
                            classes={{
                                checked: taskClasses.checked,
                                root: taskClasses.root,
                            }}
                        />
                    </TableCell>
                    <TableCell className={tableClasses.tableCell} key={"stt"}>
                        {item.stt}
                    </TableCell>
                    <TableCell className={tableClasses.tableCell} key={"productInfo"}>
                        {productInfo(item)}
                    </TableCell>
                    <TableCell className={tableClasses.tableCell} key={"category"}>
                        {item.category}
                    </TableCell>
                    <TableCell className={tableClasses.tableCell} key={"price"}>
                        {formatCurrency(item.price)}
                    </TableCell>
                    <TableCell className={tableClasses.tableCell} key={"shop"}>
                        {item.shop_code}
                    </TableCell>
                    <TableCell className={tableClasses.tableCell} key={"status"}>
                        {item.status}
                    </TableCell>
                    <TableCell className={tableClasses.tableCell} key={"createBy"}>
                        {item.createBy}
                    </TableCell>
                    <TableCell className={tableClasses.tableCell} key={"publish"}>
                        {moment(item.publish).format("DD/MM/YYYY")}
                    </TableCell>
                </TableRow>
                {item?.has_model &&
                    showProduct.indexOf(item) !== -1 &&
                    item.model_data.model.map((subItem, subIdx) => {
                        return (
                            <TableRow
                                key={index}
                                className={
                                    tableClasses.tableBodyRow + " " + classes.tableTransition
                                }
                                style={{
                                    backgroundColor:
                                        checked.indexOf(item) !== -1 ? "#fff6f0" : "#fff",
                                }}
                            >
                                <TableCell className={tableClasses.tableCell}></TableCell>
                                <TableCell
                                    className={tableClasses.tableCell}
                                    key={"productInfo"}
                                    style={{paddingLeft: "70px !important"}}
                                >
                                    {productTypeInfo(subItem, index)}
                                </TableCell>
                                <TableCell className={tableClasses.tableCell} key={"quantity"}>
                                    {formatNumber(subItem.stock_info[0].current_stock)}
                                </TableCell>
                                <TableCell className={tableClasses.tableCell} key={"price"}>
                                    {formatCurrency(subItem.price_info[0].current_price)}
                                </TableCell>
                                <TableCell className={tableClasses.tableCell} key={"order"}>
                                    {formatNumber(subItem.order)}
                                </TableCell>
                                <TableCell className={tableClasses.tableCell} key={"sales"}>
                                    {formatCurrency(subItem.sales)}
                                </TableCell>
                                <TableCell className={tableClasses.tableCell} key={"status"}>
                                    {subItem.status}
                                </TableCell>
                            </TableRow>
                        );
                    })}
            </React.Fragment>
        );
    };

    return (
        <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{t('sideBar.productApproval')}</h4>
            </CardHeader>
            <CardBody className={classes.cardBody}>
                <div>
                    <div
                        className={dashClasses.filterSelections}
                        style={{
                            marginLeft: "25px",
                            position: "relative",
                            display: "block",
                        }}
                    >
                        <FormControl className={dashClasses.formControl}>
                            <div style={{marginRight: "15px"}}>
                                <CustomInput
                                    formControlProps={{
                                        className:
                                            adminClasses.margin + " " + classes.searchContainer,
                                    }}
                                    inputProps={{
                                        placeholder: t('findBy'),
                                        onChange: handleInputSearch,
                                    }}
                                />
                                <Button
                                    color="white"
                                    aria-label="edit"
                                    justIcon
                                    round
                                    onClick={() => setDoSearch(!doSearch)}
                                >
                                    <Search/>
                                </Button>
                            </div>
                        </FormControl>
                        <FormControl>
                            <Button
                                color="white"
                                id={"filter-date-label"}
                                aria-owns={filterDate ? "filter-date" : null}
                                aria-haspopup="true"
                                className={classes.filteTritle}
                                onClick={() => setFilterDate(true)}
                            >
                                {moment(fromDate).format("DD/MM/yyyy") +
                                    " - " +
                                    moment(toDate).format("DD/MM/yyyy")}
                            </Button>
                            <Poppers
                                open={Boolean(filterDate)}
                                anchorEl={filterDate}
                                transition
                                disablePortal
                                className={
                                    classNames({
                                        [classes.popperClose]: filterDate != true,
                                    }) +
                                    " " +
                                    classes.popperNav
                                }
                            >
                                {({TransitionProps, placement}) => (
                                    <Grow
                                        {...TransitionProps}
                                        id={"filter-date"}
                                        style={{
                                            transformOrigin:
                                                placement === "bottom" ? "center top" : "center bottom",
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={() => setFilterDate(false)}
                                            >
                                                <div style={{width: isMobile ? "190px" : "460px"}}>
                                                    <div
                                                        style={{padding: "7px 15px", borderRadius: "4px"}}
                                                    >
                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                fontSize: "17px",
                                                                fontWeight: "400",
                                                                color: primaryColor[0],
                                                            }}
                                                        >
                                                            {t('chooseDate')}
                                                        </p>
                                                        <div style={{marginTop: "10px"}}>
                                                            <MuiPickersUtilsProvider
                                                                utils={DateFnsUtils}
                                                                locale={vi}
                                                            >
                                                                <GridContainer>
                                                                    <KeyboardDatePicker
                                                                        disableToolbar
                                                                        variant="inline"
                                                                        format="dd/MM/yyyy"
                                                                        margin="normal"
                                                                        id="date-picker-inline"
                                                                        label={t('from')}
                                                                        value={fromDate}
                                                                        onChange={(value) => setFromDate(value)}
                                                                        KeyboardButtonProps={{
                                                                            "aria-label": "change date",
                                                                        }}
                                                                        style={{margin: "0 40px", width: "150px"}}
                                                                    />
                                                                    <KeyboardDatePicker
                                                                        disableToolbar
                                                                        variant="inline"
                                                                        format="dd/MM/yyyy"
                                                                        margin="normal"
                                                                        id="date-picker-inline"
                                                                        label={t('to')}
                                                                        value={toDate}
                                                                        onChange={(value) => setToDate(value)}
                                                                        KeyboardButtonProps={{
                                                                            "aria-label": "change date",
                                                                        }}
                                                                        style={{margin: "0 40px", width: "150px"}}
                                                                    />
                                                                </GridContainer>
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                marginTop: "15px",
                                                                justifyContent: "flex-end",
                                                            }}
                                                        >
                                                            <Button
                                                                color="white"
                                                                size="sm"
                                                                style={{marginRight: "10px"}}
                                                                onClick={() => resetFilterDate()}
                                                            >
                                                                {t('reset')}
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setDoFilter(doFilter + 1);
                                                                    setFilterDate(false);
                                                                }}
                                                            >
                                                                {t('apply')}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Poppers>
                        </FormControl>
                        <FormControl
                            className={dashClasses.formControl}
                            style={{
                                marginRight: "25px",
                                position: isMobile ? "static" : "absolute",
                                right: "0",
                            }}
                        >
                            <Button
                                id="update-label"
                                color="primary"
                                onClick={() => setShowUpdate(true)}
                            >
                                {t('action')}
                                <Icon className={classes.btnFilter}>expand_more_outlined</Icon>
                            </Button>
                            <Poppers
                                open={Boolean(showUpdate)}
                                anchorEl={showUpdate}
                                transition
                                disablePortal
                                className={
                                    classNames({[classes.popperClose]: !showUpdate}) +
                                    " " +
                                    classes.popperNav
                                }
                            >
                                {({TransitionProps, placement}) => (
                                    <Grow
                                        {...TransitionProps}
                                        id="notification-menu-list-grow"
                                        style={{
                                            transformOrigin:
                                                placement === "bottom" ? "center top" : "center bottom",
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={() => handleUpdate()}>
                                                <MenuList role="menu">
                                                    <MenuItem
                                                        className={classes.dropdownItem}
                                                        onClick={() => handleApprove()}
                                                    >
                                                        {t('productApproval.approve')}
                                                    </MenuItem>
                                                    {/*<Link href="/admin/product/copyproduct">*/}
                                                    {/*    <MenuItem*/}
                                                    {/*        className={classes.dropdownItem}*/}
                                                    {/*        onClick={() => handleUpdate()}*/}
                                                    {/*    >*/}
                                                    {/*        Sao chép sản phẩm trên kênh...*/}
                                                    {/*    </MenuItem>*/}
                                                    {/*</Link>*/}
                                                    {/*                        <MenuItem*/}
                                                    {/*                            className={classes.dropdownItem}*/}
                                                    {/*                            onClick={() => handleUpdate()}*/}
                                                    {/*                        >*/}
                                                    {/*<span onClick={() => setShowFilter2(true)}>*/}
                                                    {/*  Xuất danh sách sản phẩm*/}
                                                    {/*</span>*/}
                                                    {/*                        </MenuItem>*/}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Poppers>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={showFilter2}
                                onClose={() => setShowFilter2(false)}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={showFilter2}>
                                    <Card className={classes.modalContainer}>
                                        <CardHeader color="primary">
                                            <h4 className={classes.cardTitleWhite}>
                                                Xuất danh sách sản phẩm
                                            </h4>
                                        </CardHeader>
                                        <CardBody>
                                            <div class={classes.filterEleContent}>
                                                <FormControl component="fieldset">
                                                    <RadioGroup
                                                        aria-label="shop"
                                                        name="shop1"
                                                        value={value}
                                                        onChange={handleChange}
                                                    >
                                                        {listRadio.map((item) => {
                                                            return (
                                                                <div className={classes.radioFormLabel}>
                                                                    <FormControlLabel
                                                                        value={item.id}
                                                                        control={<CustomRadio/>}
                                                                        className={classes.radioFCL}
                                                                        label={item.label}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </CardBody>
                                        <CardFooter>
                                            <div className={classes.filterFooter}>
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        setShowFilter2(false);
                                                    }}
                                                >
                                                    Tải File
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Fade>
                            </Modal>
                        </FormControl>
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <div
                    className={tableClasses.tableResponsive}
                    style={{marginTop: "0"}}
                >
                    <Table className={tableClasses.table}>
                        {data !== undefined ? (
                            <TableHead className={tableClasses["primary" + "TableHeader"]}>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    <TableCell className={tableClasses.tableCell}>
                                        <Checkbox
                                            checked={isCheckAll}
                                            tabIndex={-1}
                                            onClick={() => handleCheckAll()}
                                            checkedIcon={
                                                <Check className={taskClasses.checkedIcon}/>
                                            }
                                            icon={<Check className={taskClasses.uncheckedIcon}/>}
                                            classes={{
                                                checked: taskClasses.checked,
                                                root: taskClasses.root,
                                            }}
                                        />
                                    </TableCell>
                                    {TABLE_HEAD.map((prop, key) => {
                                        return (
                                            <TableCell
                                                className={
                                                    tableClasses.tableCell +
                                                    " " +
                                                    tableClasses.tableHeadCell
                                                }
                                                key={key}
                                            >
                                                {prop}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                        ) : null}
                        <TableBody>
                            {fakeData.map((item, index) => {
                                return renderProduct(item, index);
                            })}
                        </TableBody>
                    </Table>
                    <div style={{margin: "15px 0"}}>
                        <Pagination
                            count={totalPage}
                            page={currentPage}
                            onChange={handleSelectPage}
                        />
                    </div>
                    {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={2}
          page={1}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
                </div>
            </CardFooter>
            <NotificationContainer />
        </Card>
    );
}

ProductApproval.layout = Admin;

export default WithAuthentication(ProductApproval);
