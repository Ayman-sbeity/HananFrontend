import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, useRef, type ReactNode } from "react";
import type { ButtonProps, SxProps, Theme } from "@mui/material";

export interface ICustomButtonProps extends ButtonProps {
  label?: ReactNode;
  icon?: React.ReactElement;
  iconPosition?: "left" | "center" | "right";
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
  iconButtonSize?: number;
  sx?: SxProps<Theme>;
  borderRadius?: string | number;
  textColor?: string;
  borderColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  isIconOnly?: boolean;
  isTextOnly?: boolean;
  disableElevation?: boolean;
  minWidth?: number;
  minHeight?: number;
  bold?: string;
  onClick?: (() => void) | (() => Promise<void>);
  disabled?: boolean;
  showExportProgress?: boolean;
  useRealProgressTracking?: boolean;
  exportId?: string;
  onExportProgress?: (progress: {
    progress: number;
    message: string;
    status: string;
  }) => void;
}

const CustomButton: React.FC<
  ICustomButtonProps & { children?: React.ReactNode }
> = ({
  loading = false,
  iconPosition = "left",
  iconButtonSize = 40,
  label,
  startIcon,
  endIcon,
  textColor,
  borderColor = "transparent",
  bgColor,
  borderRadius,
  minWidth,
  minHeight,
  bold = false,
  size = "medium",
  sx,
  isIconOnly = !label && (startIcon || endIcon),
  isTextOnly = label && !startIcon && !endIcon,
  disabled = false,
  children,
  onClick,
  hoverBgColor,
  showExportProgress = false,
  ...props
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const isExportButton =
    typeof label === "string" && label.toLowerCase() === "export";

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const simulateExportProgress = async (exportPromise: Promise<unknown>) => {
    setExportProgress(0);
    setIsExporting(true);
    setProgressMessage("5%");

    const progressStages = [
      { progress: 5, message: "5%" },
      { progress: 15, message: "15%" },
      { progress: 25, message: "25%" },
      { progress: 40, message: "40%" },
      { progress: 55, message: "55%" },
      { progress: 70, message: "70%" },
      { progress: 85, message: "85%" },
      { progress: 95, message: "95%" },
    ];

    let currentStage = 0;
    let apiCompleted = false;

    const updateProgress = () => {
      if (!apiCompleted && currentStage < progressStages.length) {
        const { progress, message } = progressStages[currentStage];
        setExportProgress(progress);
        setProgressMessage(message);
        currentStage++;
      }
    };

    progressInterval.current = setInterval(updateProgress, 400);

    try {
      await exportPromise;
      apiCompleted = true;

      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      setExportProgress(100);
      setProgressMessage("Exported!");

      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setProgressMessage("");
      }, 800);
    } catch (error) {
      apiCompleted = true;
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      setProgressMessage("Export failed!");
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setProgressMessage("");
      }, 1000);
      throw error;
    }
  };

  const handleClick = async () => {
    if (onClick) {
      setInternalLoading(true);

      try {
        const result = onClick();

        if (isExportButton && showExportProgress) {
          if (result instanceof Promise) {
            await simulateExportProgress(result);
          } else {
            await simulateExportProgress(Promise.resolve(result));
          }
        } else {
          if (result instanceof Promise) {
            await result;
          }
        }
      } finally {
        setInternalLoading(false);
      }
    }
  };

  const isDisabled = disabled || loading || internalLoading;

  const showProgress = isExportButton && showExportProgress && isExporting;

  const buttonSx: SxProps<Theme> = {
    textTransform: "none",
    minWidth:
      minWidth ??
      (isIconOnly
        ? iconButtonSize
        : isTextOnly && size === "small"
        ? 30
        : size === "large"
        ? 248.41
        : size === "medium"
        ? 110
        : undefined),
    minHeight:
      minHeight ??
      (isIconOnly
        ? iconButtonSize
        : isTextOnly && size === "small"
        ? 30
        : isTextOnly
        ? 36
        : undefined),
    padding: isIconOnly
      ? 0
      : isTextOnly && size === "small"
      ? "4px 8px"
      : isTextOnly
      ? "6px 12px"
      : undefined,
    justifyContent:
      isIconOnly || iconPosition === "center"
        ? "center"
        : isTextOnly
        ? "center"
        : undefined,
    display: "flex",
    alignItems: "center",
    flexDirection: showProgress ? "column" : "row",
    color: textColor,
    borderColor: borderColor,
    backgroundColor: bgColor,
    borderRadius: borderRadius,
    fontWeight: bold ? "bold" : undefined,
    cursor: isDisabled ? "not-allowed" : undefined,
    opacity: isDisabled ? 0.6 : 1,
    position: "relative",
    overflow: "hidden",
    ":hover": {
      backgroundColor: hoverBgColor,
    },
    ...sx,
  };

  const renderButtonContent = () => {
    if (showProgress) {
      return (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="caption" sx={{ mb: 0.5, fontSize: "0.75rem" }}>
            {progressMessage || `Exporting... ${exportProgress}%`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={exportProgress}
            sx={{
              width: "100%",
              height: 4,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: textColor || "#fff",
                borderRadius: 2,
              },
            }}
          />
        </Box>
      );
    }

    if (loading || internalLoading) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CircularProgress
            size={16}
            sx={{ color: textColor || "currentColor" }}
          />
          {label}
        </Box>
      );
    }

    if (children) return children;
    if (isIconOnly) return startIcon || endIcon;
    return label;
  };

  return (
    <Button
      {...props}
      sx={buttonSx}
      startIcon={
        !isIconOnly && !isTextOnly && iconPosition === "left" && !showProgress
          ? startIcon
          : undefined
      }
      endIcon={
        !isIconOnly && !isTextOnly && iconPosition === "right" && !showProgress
          ? endIcon
          : undefined
      }
      disabled={isDisabled}
      onClick={handleClick}
    >
      {renderButtonContent()}
    </Button>
  );
};

export default CustomButton;
