import * as React from "react"
import { cn } from "../../lib/utils"

const SectionHeader = React.forwardRef(
  ({ title, description, badge, className, titleClassName, descriptionClassName, badgeClassName, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className={cn("text-lg font-semibold tracking-tight", titleClassName)}>{title}</h2>
        {badge ? (
          <span className={cn("inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", badgeClassName)}>
            {badge}
          </span>
        ) : null}
      </div>
      {description ? <p className={cn("text-sm leading-6 text-slate-500", descriptionClassName)}>{description}</p> : null}
    </div>
  )
)
SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
