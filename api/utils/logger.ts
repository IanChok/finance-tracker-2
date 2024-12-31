// Import colors for pretty logs
import {
    brightBlue,
    brightGreen,
    brightYellow,
    brightRed,
    brightCyan,
    bold,
    gray,
  } from "https://deno.land/std/fmt/colors.ts";
  
  export function logger(
    level: "INFO" | "WARN" | "ERROR" | "DEBUG",
    message: string,
    data?: unknown
  ) {
    const now = new Date();
    const timestamp = gray(`[${now.toISOString()}]`); // Timestamp in gray
  
    // Color mappings for log levels
    const levelColors: Record<typeof level, string> = {
      INFO: brightGreen("INFO"),
      WARN: brightYellow("WARN"),
      ERROR: brightRed("ERROR"),
      DEBUG: brightBlue("DEBUG"),
    };
  
    let printMessage = '';

    // Format the message with its level and timestamp
    const logHeader = `${bold(levelColors[level])} ${timestamp} ${brightBlue(
      message
    )}`;
    printMessage += logHeader;
  
    // If additional data is supplied, format it as pretty JSON
    if (data) {
      const prettyData = JSON.stringify(data, null, 2); // Pretty JSON formatting
      printMessage += '\n' + brightCyan(prettyData)
    }

    console.log(printMessage)
  }
  