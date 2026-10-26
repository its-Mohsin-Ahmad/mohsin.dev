import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User, Code, Briefcase, Mail } from 'lucide-react';

interface Tab {
  name: string;
  path: string;
  icon: React.FC<{ size?: number }>;
}

const tabs: Tab[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: User },
  { name: 'Skills', path: '/skills', icon: Code },
  { name: 'Projects', path: '/projects', icon: Briefcase },
  { name: 'Contact', path: '/contact', icon: Mail },
];

const offsets = ['-36%', '-18%', '0%', '18%', '36%'];

export const MobileBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = tabs.findIndex((t) =>
    t.path === '/' ? location.pathname === '/' : location.pathname.startsWith(t.path)
  );
  const safeIndex = activeIndex === -1 ? 0 : activeIndex;

  const [fabIconIndex, setFabIconIndex] = useState(safeIndex);
  const [fabOpacity, setFabOpacity] = useState(1);
  const [fabScale, setFabScale] = useState(1);

  useEffect(() => {
    setFabOpacity(0);
    setFabScale(0.5);
    const t = setTimeout(() => {
      setFabIconIndex(safeIndex);
      setFabOpacity(1);
      setFabScale(1);
    }, 150);
    return () => clearTimeout(t);
  }, [safeIndex]);

  const ActiveIcon = tabs[fabIconIndex].icon;

  return (
    <>
      <div className="mobile-bottom-nav" aria-label="Mobile navigation">
        <div className="mbn-dock" style={{ '--notch-x': `${50 + parseInt(offsets[safeIndex])}%` } as React.CSSProperties}>
          <div
            className="mbn-fab-wrap"
            style={{ transform: `translateX(${offsets[safeIndex]})` }}
          >
            <div className="mbn-fab">
              <span
                style={{
                  display: 'inline-flex',
                  opacity: fabOpacity,
                  transform: `scale(${fabScale})`,
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                }}
              >
                <ActiveIcon size={22} />
              </span>
            </div>
          </div>
          {tabs.map((tab, i) => {
            const isActive = i === safeIndex;
            const Icon = tab.icon;
            return (
              <button
                key={tab.path}
                type="button"
                onClick={() => navigate(tab.path)}
                className="mbn-tab"
                aria-label={tab.name}
                aria-current={isActive ? 'page' : undefined}
              >
                <div
                  className="mbn-icon-box"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transform: isActive ? 'scale(0.75)' : 'scale(1)',
                  }}
                >
                  <Icon size={20} />
                </div>
                <span
                  className="mbn-label"
                  style={{ color: isActive ? '#FF8833' : '#9ca3af' }}
                >
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .mobile-bottom-nav {
          display: none;
        }
        @media (max-width: 820px) {
          .mobile-bottom-nav {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 90;
            padding: 0 1rem 1rem;
            pointer-events: none;
          }
          .mbn-dock {
            pointer-events: auto;
            position: relative;
            width: 100%;
            height: 64px;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 0.5rem;
          }
          .mbn-dock::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            -webkit-mask-image: radial-gradient(circle 34px at var(--notch-x, 50%) 0px, transparent 26px, black 42px);
            mask-image: radial-gradient(circle 34px at var(--notch-x, 50%) 0px, transparent 26px, black 42px);
            z-index: -1;
          }

          .mbn-notch {
            position: absolute;
            top: -18px;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            pointer-events: none;
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .mbn-fab-wrap {
            position: absolute;
            top: -24px;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            pointer-events: none;
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .mbn-fab {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #E65C00, #FF8833);
            border-radius: 50%;
            box-shadow: 0 8px 24px rgba(255, 107, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 20px;
            z-index: 20;
            pointer-events: auto;
          }
          .mbn-tab {
            position: relative;
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 10;
            color: inherit;
          }
          .mbn-icon-box {
            color: #FF6B00;
            font-size: 18px;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .mbn-label {
            font-size: 10px;
            font-weight: 500;
            margin-top: 4px;
            transition: color 0.3s ease;
          }
        }
        @media (max-width: 820px) {
          main {
            padding-bottom: 110px !important;
          }
        }
      `}</style>
    </>
  );
};

export default MobileBottomNav;

