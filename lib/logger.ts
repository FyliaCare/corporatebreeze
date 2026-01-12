/**
 * Simple structured logger for production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  error?: Error
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    }

    if (this.isDevelopment) {
      // Pretty print in development
      const levelColors: Record<LogLevel, string> = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m',  // Green
        warn: '\x1b[33m',  // Yellow
        error: '\x1b[31m', // Red
      }
      
      const reset = '\x1b[0m'
      console.log(
        `${levelColors[level]}[${level.toUpperCase()}]${reset} ${message}`,
        context ? context : '',
        error ? error : ''
      )
    } else {
      // JSON structured logs in production
      console.log(JSON.stringify(entry))
    }
  }

  debug(message: string, context?: Record<string, any>) {
    if (this.isDevelopment) {
      this.log('debug', message, context)
    }
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context)
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log('error', message, context, error)
  }

  // API request logger
  apiRequest(method: string, path: string, statusCode: number, duration: number, context?: Record<string, any>) {
    this.info(`${method} ${path} - ${statusCode}`, {
      method,
      path,
      statusCode,
      duration: `${duration}ms`,
      ...context,
    })
  }

  // Database query logger
  dbQuery(query: string, duration: number, error?: Error) {
    if (error) {
      this.error('Database query failed', error, { query, duration: `${duration}ms` })
    } else if (this.isDevelopment) {
      this.debug(`DB Query (${duration}ms)`, { query })
    }
  }
}

export const logger = new Logger()
