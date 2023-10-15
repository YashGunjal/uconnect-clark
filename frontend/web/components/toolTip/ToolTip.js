import React from 'react'
import { Tooltip} from "reactstrap"

export default function ToolTip({id, infoText}) {
	const [tooltipOpen, setTooltipOpen] = React.useState(false);

	return (
		<Tooltip
			isOpen={tooltipOpen}
			flip
			target={id}
			toggle={() => { setTooltipOpen(!tooltipOpen) }}
		>
			{infoText}
		</Tooltip>
	);
}