
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as echarts from "echarts/core";
import { EChartsOption } from "echarts";

// Charts
import {
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    RadarChart,
    MapChart,
    TreeChart,
    TreemapChart,
    GraphChart,
    GaugeChart,
    FunnelChart,
    ParallelChart,
    SankeyChart,
    BoxplotChart,
    CandlestickChart,
    EffectScatterChart,
    LinesChart,
    HeatmapChart,
    PictorialBarChart,
    ThemeRiverChart,
    SunburstChart,
    CustomChart
} from "echarts/charts";

// Components
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
    VisualMapComponent,
    MarkPointComponent,
    MarkLineComponent,
    ToolboxComponent,
    RadarComponent,
    GeoComponent,
    ParallelComponent,
    CalendarComponent,
    DataZoomComponent,
    TimelineComponent,
    GraphicComponent,
    AriaComponent,
    TransformComponent
} from "echarts/components";

// Renderer
import { CanvasRenderer } from "echarts/renderers";

import {
    UniversalTransition,
    LabelLayout
} from "echarts/features";

echarts.use([
    // Charts
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    RadarChart,
    MapChart,
    TreeChart,
    TreemapChart,
    GraphChart,
    GaugeChart,
    FunnelChart,
    ParallelChart,
    SankeyChart,
    BoxplotChart,
    CandlestickChart,
    EffectScatterChart,
    LinesChart,
    HeatmapChart,
    PictorialBarChart,
    ThemeRiverChart,
    SunburstChart,
    CustomChart,

    // Components
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
    VisualMapComponent,
    MarkPointComponent,
    MarkLineComponent,
    ToolboxComponent,
    RadarComponent,
    GeoComponent,
    ParallelComponent,
    CalendarComponent,
    DataZoomComponent,
    TimelineComponent,
    GraphicComponent,
    AriaComponent,
    TransformComponent,

    CanvasRenderer,
    UniversalTransition,
    LabelLayout
]);

export class DynamicChart
    implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container!: HTMLDivElement;
    private chart: echarts.ECharts | null = null;

    private renderToken = 0;
    private lastConfig = "";


    /*
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {

        this.container = container;

        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.minHeight = "300px";

        this.chart = echarts.init(this.container);

        window.addEventListener(
            "resize",
            this.handleResize
        );
    }
        */



    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {

        this.container = container;

        // Container sizing
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.minHeight = "100px";
        this.container.style.boxSizing = "border-box";

        // Positioning
        this.container.style.position = "relative";
        this.container.style.overflow = "hidden";

        // Stacking order
        this.container.style.zIndex = "1";

        // Optional background
        this.container.style.backgroundColor = "transparent";

        // Initialize chart
        this.chart = echarts.init(this.container);

        // Resize handler
        window.addEventListener(
            "resize",
            this.handleResize
        );
    }



    public updateView(
        context: ComponentFramework.Context<IInputs>
    ): void {



        const chartHeight =
            context.parameters.ChartHeight.raw ?? 100;

        this.container.style.height = `${chartHeight}px`;

        this.chart?.resize();

        const chartConfig =
            context.parameters.ChartConfig.raw;

        if (!chartConfig || !this.chart) {
            return;
        }

        // Prevent unnecessary rerender
        if (this.lastConfig === chartConfig) {
            return;
        }

        this.lastConfig = chartConfig;

        let option: EChartsOption;

        try {

            option = JSON.parse(chartConfig);

        } catch (error) {

            console.error("Invalid chart JSON:", error);

            console.error(
                "Raw JSON:",
                chartConfig
            );

            this.container.innerHTML = `
                <div style="
                    padding:16px;
                    color:red;
                    font-family:Segoe UI;
                    font-size:14px;">
                    Invalid Chart JSON
                </div>`;

            return;
        }

        const token = ++this.renderToken;

        requestAnimationFrame(() => {

            if (
                token !== this.renderToken ||
                !this.chart
            ) {
                return;
            }

            try {

                console.log(
                    "Rendering Chart",
                    option
                );

                // Clear previous chart state
                this.chart.clear();

                // Render fresh chart
                this.chart.setOption(option, {
                    notMerge: true,
                    lazyUpdate: false
                });

                this.chart.resize();

            } catch (error) {

                console.error(
                    "Chart Render Error:",
                    error
                );
            }
        });
    }

    private handleResize = (): void => {

        if (this.chart) {
            this.chart.resize();
        }
    };

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {

        this.renderToken++;

        window.removeEventListener(
            "resize",
            this.handleResize
        );

        if (this.chart) {

            this.chart.dispose();

            this.chart = null;
        }
    }
}