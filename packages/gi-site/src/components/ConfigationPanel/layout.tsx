// 配置项见文档 https://yuque.antfin-inc.com/aandm7/aighig/mdrghk
// 分析组件分为两种 分析组件和分析交互
import { extractDefault } from '@ali/react-datav-gui-utils';

const configObj = {
  options: {
    "layout": {
      "name": "Legend",
      "type": "group",
      "enableHide": true,
      "children": {
        "font": {
          "name": "字体",
          "type": "select",
          "useFont": true,
          "default": "SimSun",
          "options": [
            {
              "value": "Microsoft Yahei",
              "label": "微软雅黑"
            },
            {
              "value": "SimSun",
              "label": "宋体"
            },
            {
              "value": "SimHei",
              "label": "黑体"
            }
          ]
        },
        "size": {
          "type": "stepper",
          "caption": "大小",
          "min": 0,
          "max": 10,
          "step": 1,
          "col": 12
        }
      }
    }
  }      
};

const valueObj = extractDefault({ config: configObj });
const props = { configObj, valueObj };

export  default props;