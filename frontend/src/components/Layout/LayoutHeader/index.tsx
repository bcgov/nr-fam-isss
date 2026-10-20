import { Header, HeaderMenuButton, HeaderName, SkipToContent } from "@carbon/react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { LayoutHeaderPanel } from "@/components/Layout/LayoutHeaderPanel";
import { LayoutSideNav } from "@/components/Layout/LayoutSideNav";
import { useLayout } from "@/context/layout/useLayout";
import { ROUTES } from "@/routes/routePaths";
import { getBranding } from "@/utils/Branding";
import LayoutHeaderGlobalBar from "./LayoutHeaderGlobalBar";
import "./LayoutHeader.css";

type Props = {
    accessRoles: readonly string[];
};

/**
 * The title bar, matching nr-fsp-new's treatment: a regular-weight prefix ahead
 * of the bold application name, the drawer toggle on the left, and the nav
 * rendered as a child of the header so Carbon anchors the drawer beneath it.
 */
export const LayoutHeader: FC<Props> = ({ accessRoles }) => {
    const { isSideNavExpanded, toggleSideNav } = useLayout();
    const { name, acronym } = getBranding();

    return (
        <Header aria-label={name} className="bc-header" data-testid="bc-header__header">
            <SkipToContent />
            <HeaderMenuButton
                aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
                isActive={isSideNavExpanded}
                onClick={toggleSideNav}
            />
            <HeaderName as={Link} to={ROUTES.managePermissions} prefix={acronym}>
                {name}
            </HeaderName>

            <LayoutHeaderGlobalBar />
            <LayoutHeaderPanel />
            <LayoutSideNav accessRoles={accessRoles} />
        </Header>
    );
};

export default LayoutHeader;
