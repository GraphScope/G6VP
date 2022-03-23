import { CommonStyleSetting } from '@alipay/gi-common-components';
import { useContext } from '@alipay/graphinsight';
import React from 'react';
import { NodeConfig } from '../../elements/SimpleNode/registerTransform';
import { schema } from './registerMeta';

export type NodesConfig = {
  id: string;
  groupId: string;
  groupName: string;
  expressions: any[];
  props: NodeConfig;
}[];

interface MetaProps {
  key: string;
  meta: Object;
}

export interface StyleSettingProps {
  shapeOptions: MetaProps[];
  data: { nodes: any[]; edges: any[] };
  elementType: 'node' | 'edge';
}

const data = {
  nodes: [
    {
      id: 'node1',
      nodeType: 'User',
      // 默认ID
      label: 'xxx',
      data: {
        id: 'node1',
        nodeType: 'User',
        // 默认ID
        label: 'xxx',
      },
    },
    {
      id: 'node1',
      label: 'Car',
      data: {
        id: 'node1',
        label: 'Car',
      },
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node1',
      edgeType: 'edge1',
    },
  ],
};

const StyleSetting: React.FunctionComponent<StyleSettingProps> = ({ shapeOptions, elementType }) => {
  const { updateContext } = useContext();

  /**
   * 除过 groupName，Icon 和 rule 外的其他 form 表单内容更新会触发该方法
   * @param current
   * @param all
   */
  const handleChange = styleGroups => {
    const nodesConfig: NodesConfig = styleGroups.map(c => {
      return {
        id: 'SimpleNode',
        props: c.config as NodeConfig,
        groupId: c.groupId,
        groupName: c.groupName,
        expressions: c.expressions,
        logic: c.logic,
      };
    });

    console.log('nodeConfig', nodesConfig);
    updateContext(draft => {
      //@ts-ignore
      draft.config.nodes = JSON.parse(JSON.stringify(nodesConfig));
      //@ts-check
      draft.layoutCache = true;
    });
  };

  return <CommonStyleSetting schema={schema} onChange={handleChange} data={data} elementType="node" />;
};

export default StyleSetting;
