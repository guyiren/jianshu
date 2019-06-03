import styled from 'styled-components';
import logoPic from '../../statics/logo.png';

//样式写在这个文件中，其实都是一个个组件，
// Headwrapper就是带div的样式标签
export const Headwrapper = styled.div`
    position: relative;
    height: 56px;
    border-bottom: 1px solid #f0f0f0;
`;
//对attrs传一个对象,href.使得一点击图像就跳转到相应的路径
export const Logo = styled.a.attrs({
    href: './'
})`
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 56px;
    display: block;
    // 因为图片地址就这样写进url会被当成字符串
    background: url(${logoPic});
    background-size: contain;
`;
export const Nav = styled.div`
    margin: 0 auto;
    width: 945px;
    height: 100%;
    padding-right: 70px;
    box-sizing: border-box;
`;

export const NavItem = styled.div`
    &.left{
        float: left;
    }
    &.right{
        float: right;
        color: #969696;
    } 
    &.active {
        color: #ea6f5a;
    }
    line-height: 56px;
    padding: 0 15px;
    color: #333;
    font-size: 17px;
`;
export const SearchWrapper = styled.div`
    position: relative;
    float: left;
    .zoom {
        position: absolute;
        right: 5px;
        bottom: 5px;
        width: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 15px;
        &.focused {
            color: '#fff';
            background: #777;
        }
    }
`;
export const NavSearch = styled.input.attrs({
    placeholder: '搜索'
})`
       width: 160px;
       height: 38px;
       border: none;
       outline: none;
       margin-top: 9px;
       margin-left: 20px;
       padding: 0 30px 0 20px;
       box-sizing: border-box;
       line-height: 38px;
       border-radius: 19px;
       background: #eee;
       font-size: 14px;
       // 输入字体的颜色
       color: #777;
       // 这个组件下面的placeholder
       &::placeholder {
           color: #999;
       };
       &.focused {
           width: 240px;
       }
       // 这些class与input是同级关系
        &.slide-enter {
            transition: all 0.2s ease-out
        }
        &.slide-enter-active {
                width: 240px;
        }
        &.slide-exit {
                 transition: all 0.2s ease-out;
        }
        &.slide-exit-active {
                width: 160px;
        }
`;
export const SearchInfo = styled.div`
       position: absolute;
       left:0;
       top: 56px;
       width: 240px;
       padding: 0 20px;
       box-shadow: 0 0 8px rgba(0,0,0,.2);
`;
export const SearchInfoTitle = styled.div`
       margin-top: 15px;
       margin-bottom: 20px;
       line-height: 20px;
       color: #969696
       font-size: 14px;
`;
export const SearchInfoSwitch = styled.span`
       float: right;
       font-size: 13px;
       cursor: pointer;
       .spin {
       //给这个spin标签加了transition，使他具有过渡效果
       //只有block才能旋转
            display: block;
            float: left;
            font-size: 12px;
            margin-right: 2px;
            transition: all 0.2s ease;
            //旋转中心以它的中心旋转
            transform-origin: center center；
            
       }
`;
export const SearchInfoList = styled.div`
       overflow: hidden;
`;
export const SearchInfoItem = styled.a`
       display: block;
       float: left;
       border: 1px solid #ddd;
       font-size: 12px;
       padding: 0 5px;
       line-height: 20px; 
       color: #787878;
       border-radius: 3px;
       margin-right: 10px;
       margin-bottom: 15px;
`;
export const Addition = styled.div`
       position: absolute;
       right: 0;
       top: 0;
`;
export const Button = styled.div`
       float: right;
       margin-top: 9px;
          margin-right: 20px;
       line-height: 38px;
       border: 1px solid #ec6149;
       border-radius: 19px;
       padding: 0 20px;
       font-size: 14px;
       &.reg {
            background: white;
            color: #ec6149;
       }
       &.writing {
            background: #ec6149;
            color: white;
       }
`;

