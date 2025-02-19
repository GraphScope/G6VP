import { Segmented } from 'antd';
import * as React from 'react';
import { ReactNode } from 'react';

import './index.less';

/**
 * 获取hash上的search对象
 * @param location
 * @returns
 */
export const getSearchParams = (location: Location) => {
  const { hash } = location;
  const [path, search] = hash.split('?');
  const searchParams = new URLSearchParams(search);
  return {
    path,
    searchParams,
  };
};

interface SegmentedTabsProps {
  items: { key: string; children: ReactNode; label?: string; icon?: ReactNode }[];
  queryKey?: string;
  style?: React.CSSProperties;
  extra?: ReactNode;
  defaultActive?: string;
}

const SegmentedTabs: React.FunctionComponent<SegmentedTabsProps> = props => {
  const { items, queryKey = 'tab', style = {}, extra = <></>, defaultActive } = props;

  const [state, setState] = React.useState<{ active: string }>(() => {
    const { searchParams } = getSearchParams(window.location);
    const active = searchParams.get(queryKey) || defaultActive || items[0].key;
    return {
      active,
    };
  });

  const { active } = state;
  const options = items.map(item => {
    return {
      value: item.key,
      // label: item.label,
      icon: item.icon,
    };
  });

  const onChange = value => {
    const { searchParams, path } = getSearchParams(window.location);
    searchParams.set(queryKey, value);
    window.location.hash = `${path}?${searchParams.toString()}`;
    setState(preState => {
      return {
        ...preState,
        active: value,
      };
    });
  };

  return (
    <div style={{ padding: '12px', width: '100%', height: '100%' }}>
      <div style={{ borderRadius: '8px', textAlign: 'center', paddingBottom: '12px' }}>
        <Segmented options={options} value={active} onChange={onChange} />
      </div>
      <div className="gi-segmented-container-tabs">
        {items.map(item => {
          const { key, children } = item;
          const isActive = key === active;
          return (
            <div className={isActive ? 'appear' : 'hidden'} key={key}>
              {children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SegmentedTabs;
