import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsProps {
  /**
   * Array of tab items
   */
  tabs: TabItem[];
  
  /**
   * Default active tab ID
   */
  defaultActiveTab?: string;
  
  /**
   * Controlled active tab ID
   */
  activeTab?: string;
  
  /**
   * Callback when tab changes
   */
  onTabChange?: (tabId: string) => void;
  
  /**
   * Tabs orientation
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Tabs component for switching between different views
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab,
  activeTab: controlledActiveTab,
  onTabChange,
  orientation = 'horizontal',
  className = '',
}) => {
  // Use controlled or uncontrolled active tab
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState<string>(
    defaultActiveTab || (tabs.length > 0 ? tabs[0].id : '')
  );
  
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : uncontrolledActiveTab;
  
  const handleTabChange = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setUncontrolledActiveTab(tabId);
    }
    
    onTabChange?.(tabId);
  };
  
  // This is a headless component, so we don't apply any styles directly
  // The web implementation will apply the appropriate styles
  
  return (
    <div data-tabs data-orientation={orientation}>
      <div data-tabs-list role="tablist" aria-orientation={orientation}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            data-tab-trigger
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
          >
            {tab.icon && <span data-tab-icon>{tab.icon}</span>}
            <span data-tab-label>{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div data-tabs-content>
        {tabs.map(tab => (
          <div
            key={tab.id}
            data-tab-panel
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

