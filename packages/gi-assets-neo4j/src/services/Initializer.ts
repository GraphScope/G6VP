import { message } from 'antd';
import request from 'umi-request';
export const GI_SERVICE_INTIAL_GRAPH = {
  name: '初始化查询',
  service: async () => {
    return new Promise(resolve => {
      resolve({
        nodes: [],
        edges: [],
      });
    });
  },
};

export const GI_SERVICE_SCHEMA = {
  name: '查询图模型',
  service: async () => {
    let res = {
      nodes: [],
      edges: [],
    };

    const token = localStorage.getItem('Neo4j_CONNECT_URI') as string;
    if (!token) {
      // 没有登录信息，需要先登录再查询 schema
      message.error(`Neo4j 数据源连接失败: 没有获取到连接 Neo4j 数据库的连接信息，请先连接 Neo4j 数据库再进行尝试！`);
      return;
    }

    try {
      const httpServerURL = localStorage.getItem('Neo4j_HTTP_SERVER');
      const result = await request(`${httpServerURL}/api/neo4j/schema`, {
        method: 'GET',
      });

      if (result.success) {
        res = result.data;
      }
      return res;
    } catch (e) {
      message.error(`图模型查询失败: ${e}`);
    }
    return res;
  },
};
