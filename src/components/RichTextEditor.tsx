import { useRef, useCallback, useEffect, useState } from "react";
import {
    Bold, Italic, Underline, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight,
} from "lucide-react";

interface Props {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    minHeight?: string;
}

const TOOLBAR_BUTTONS = [
    { command: "bold", icon: Bold, label: "Bold" },
    { command: "italic", icon: Italic, label: "Italic" },
    { command: "underline", icon: Underline, label: "Underline" },
    { command: "divider" as const },
    { command: "insertUnorderedList", icon: List, label: "Bullet list" },
    { command: "insertOrderedList", icon: ListOrdered, label: "Numbered list" },
    { command: "divider" as const },
    { command: "justifyLeft", icon: AlignLeft, label: "Align left" },
    { command: "justifyCenter", icon: AlignCenter, label: "Align center" },
    { command: "justifyRight", icon: AlignRight, label: "Align right" },
] as const;

export default function RichTextEditor({ value, onChange, placeholder = "Start writing...", minHeight = "200px" }: Props) {
    const editorRef = useRef<HTMLDivElement>(null);
    const isInternalChange = useRef(false);
    const [isEmpty, setIsEmpty] = useState(!value);

    // Set initial content only on mount or when value changes externally
    useEffect(() => {
        if (isInternalChange.current) {
            isInternalChange.current = false;
            return;
        }
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
            setIsEmpty(!value);
        }
    }, [value]);

    const exec = useCallback((command: string) => {
        document.execCommand(command, false);
        editorRef.current?.focus();
        if (editorRef.current) {
            isInternalChange.current = true;
            const html = editorRef.current.innerHTML;
            setIsEmpty(!html || html === "<br>");
            onChange(html);
        }
    }, [onChange]);

    const handleInput = useCallback(() => {
        if (editorRef.current) {
            isInternalChange.current = true;
            const html = editorRef.current.innerHTML;
            setIsEmpty(!html || html === "<br>");
            onChange(html);
        }
    }, [onChange]);

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
    }, []);

    return (
        <div className="rounded-xl overflow-hidden bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }}>
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-3 py-2 border-b border-foreground/[0.06]">
                {TOOLBAR_BUTTONS.map((btn, i) => {
                    if (btn.command === "divider") {
                        return <div key={i} className="w-px h-5 bg-foreground/10 mx-1" />;
                    }
                    const Icon = btn.icon!;
                    return (
                        <button
                            key={btn.command}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => exec(btn.command)}
                            title={btn.label}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/40 hover:text-accent hover:bg-accent/5 transition-all duration-150"
                        >
                            <Icon className="w-4 h-4" />
                        </button>
                    );
                })}
            </div>

            {/* Editor area */}
            <div className="relative">
                {isEmpty && (
                    <div className="absolute top-3 left-4 text-sm text-foreground/30 pointer-events-none select-none">
                        {placeholder}
                    </div>
                )}
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    onPaste={handlePaste}
                    onFocus={() => setIsEmpty(!editorRef.current?.innerHTML || editorRef.current.innerHTML === "<br>")}
                    onBlur={() => setIsEmpty(!editorRef.current?.innerHTML || editorRef.current.innerHTML === "<br>")}
                    className="w-full px-4 py-3 text-sm text-foreground outline-none overflow-auto
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                        [&_li]:my-0.5 [&_b]:font-bold [&_i]:italic [&_u]:underline"
                    style={{ minHeight, wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap" }}
                />
            </div>
        </div>
    );
}
