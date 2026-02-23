"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, FileText, X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadZoneProps {
  onFileSelect?: (file: File) => void
}

export function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.name.endsWith(".csv") || droppedFile.name.endsWith(".json"))) {
      setFile(droppedFile)
      onFileSelect?.(droppedFile)
    }
  }, [onFileSelect])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      onFileSelect?.(selectedFile)
    }
  }, [onFileSelect])

  const removeFile = useCallback(() => {
    setFile(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }, [])

  return (
    <div id="upload" className="w-full">
      <h2 className="mb-3 text-lg font-semibold text-foreground">Upload Career Path</h2>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click() }}
        aria-label="Upload career path file"
        className={`relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-primary bg-primary/5 glow-primary"
            : file
            ? "border-emerald-glow/40 bg-emerald-glow/5"
            : "border-border/60 bg-card/30 hover:border-primary/40 hover:bg-primary/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.json"
          onChange={handleFileChange}
          className="sr-only"
          aria-label="Choose file"
        />

        {file ? (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-glow/10">
              <CheckCircle2 className="h-6 w-6 text-emerald-glow" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">{file.name}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); removeFile() }}
              className="ml-2 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
              isDragging ? "bg-primary/20 scale-110" : "bg-secondary"
            }`}>
              <Upload className={`h-6 w-6 transition-colors duration-300 ${
                isDragging ? "text-primary" : "text-muted-foreground"
              }`} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Drag and drop your career path file
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Supports CSV and JSON formats
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
